import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ChevronLeft, ArrowUp, Info, User, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { blogArticles } from '../data/blogData';
import { fetchDoctors } from '../data/doctorsData';
import type { Doctor } from '../data/doctorsData';

interface MedicalTipBoxProps {
  children: React.ReactNode;
  title?: string;
}

const MedicalTipBox: React.FC<MedicalTipBoxProps> = ({ children, title = "Doctor's Advice" }) => {
  return (
    <div className="bg-primary/5 border-l-4 border-primary p-6 my-6 rounded-r-xl shadow-sm">
      <div className="flex items-start gap-3.5">
        <Info className="w-5.5 h-5.5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-secondary text-[15px] mb-1.5">{title}</h4>
          <div className="text-[#5d666e] text-[13.5px] leading-relaxed font-medium">{children}</div>
        </div>
      </div>
    </div>
  );
};

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const article = blogArticles.find(a => a.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors().then(data => setAllDoctors(data));
  }, []);

  // Track scroll position for progress bar and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrolled)));
      setShowScrollTop(scrollTop > 400);

      // Find active section in viewport
      if (article) {
        const content = isAmharic ? article.contentAm : article.contentEn;
        const headings = extractHeadings(content);
        const scrollPosition = scrollTop + 120;

        for (const heading of headings) {
          const el = document.getElementById(heading.id);
          if (el) {
            const offsetTop = el.offsetTop;
            const offsetBottom = offsetTop + el.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom + 200) {
              setActiveSection(heading.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article, isAmharic]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-28">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold text-secondary mb-4">
            {isAmharic ? 'ጽሑፉ አልተገኘም' : 'Article Not Found'}
          </h1>
          <p className="text-[#5d666e] mb-6">
            {isAmharic ? 'የሚፈልጉት የጦማር ጽሑፍ በሲስተሙ ውስጥ የለም።' : "The health article you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="btn-primary"
          >
            {isAmharic ? 'ወደ ጦማር ተመለስ' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  // Query related doctor details
  const relatedDoctor = allDoctors.find(d => d.id === article.authorId);

  // Extract headings for Table of Contents
  const extractHeadings = (content: string) => {
    const lines = content.split('\n');
    const list: { text: string; id: string; level: number }[] = [];
    lines.forEach(line => {
      if (line.startsWith('# ')) {
        const text = line.slice(2).trim();
        list.push({ text, id: generateId(text), level: 1 });
      } else if (line.startsWith('## ')) {
        const text = line.slice(3).trim();
        list.push({ text, id: generateId(text), level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.slice(4).trim();
        list.push({ text, id: generateId(text), level: 3 });
      }
    });
    return list;
  };

  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0400-\u04FF\u1200-\u137F-]/g, ''); // supports Amharic chars in ID
  };

  const activeContent = isAmharic ? article.contentAm : article.contentEn;
  const headings = extractHeadings(activeContent);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Render markdown parser
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          const text = line.slice(2).trim();
          return (
            <h1 key={index} id={generateId(text)} className="text-[28px] md:text-[34px] font-bold text-secondary mb-6 mt-10 first:mt-0 leading-tight">
              {text}
            </h1>
          );
        } else if (line.startsWith('## ')) {
          const text = line.slice(3).trim();
          return (
            <h2 key={index} id={generateId(text)} className="text-[20px] md:text-[24px] font-bold text-secondary mb-4 mt-8 leading-snug border-b border-gray-100 pb-2">
              {text}
            </h2>
          );
        } else if (line.startsWith('### ')) {
          const text = line.slice(4).trim();
          return (
            <h3 key={index} id={generateId(text)} className="text-[16px] md:text-[18px] font-bold text-secondary mb-3 mt-6">
              {text}
            </h3>
          );
        } else if (line.startsWith('**Doctor\'s Advice**')) {
          const text = line.replace('**Doctor\'s Advice**', '').trim();
          return (
            <MedicalTipBox key={index} title={isAmharic ? 'የዶክተር ምክር' : "Doctor's Advice"}>
              {text}
            </MedicalTipBox>
          );
        } else if (line.match(/^[*+-]\s/)) {
          const text = line.replace(/^[*+-]\s/, '').trim();
          return (
            <li key={index} className="text-[#5d666e] text-[14.5px] leading-relaxed mb-2.5 ml-6 list-disc">
              {text}
            </li>
          );
        } else if (line.trim()) {
          // Parse bold markdown tags
          const parts = line.split('**');
          return (
            <p key={index} className="text-[#5d666e] text-[14.5px] leading-relaxed mb-4">
              {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-secondary">{part}</strong> : part))}
            </p>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="bg-white min-h-screen pt-[160px] md:pt-[200px] pb-20">
      {/* Scroll Progress Bar - Always at absolute top of viewport */}
      <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-100/50 z-[999999]">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container-custom">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-secondary hover:text-primary font-bold text-[13px] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isAmharic ? 'ወደ ጦማር ተመለስ' : 'Back to Blog'}</span>
          </button>

          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
            {isAmharic ? article.categoryAm : article.categoryEn}
          </span>
        </div>

        {/* Article Title Header */}
        <div className="max-w-[900px] mb-8">
          <h1 className="text-[28px] md:text-[38px] lg:text-[46px] font-bold text-secondary leading-tight mb-5">
            {isAmharic ? article.titleAm : article.titleEn}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[13px] text-[#8c949c]">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="font-semibold text-secondary">{isAmharic ? article.authorNameAm : article.authorNameEn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{isAmharic ? article.dateAm : article.dateEn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{article.readMin} {isAmharic ? 'ደቂቃ ንባብ' : 'min read'}</span>
            </div>
          </div>
        </div>

        {/* Feature Image Banner */}
        <div className="w-full h-[280px] md:h-[480px] rounded-[24px] overflow-hidden mb-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100">
          <img
            src={article.image}
            alt={isAmharic ? article.titleAm : article.titleEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Two Column Layout (Left: TOC Sidebar, Right: Core Body) */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Table of Contents Sidebar */}
          {headings.length > 0 && (
            <aside className="w-full lg:w-[280px] shrink-0 sticky top-[110px] hidden lg:block bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm">
              <h4 className="text-[12px] font-black text-secondary uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                {isAmharic ? 'የማውጫ ዝርዝር' : 'Table of Contents'}
              </h4>
              <div className="flex flex-col gap-1 relative pl-2.5 border-l-2 border-gray-100">
                {headings.map(h => {
                  const isActive = activeSection === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`text-left text-[13px] py-1.5 transition-all duration-300 relative ${
                        isActive
                          ? 'text-primary font-bold -ml-[11px] pl-[10px] border-l-2 border-primary'
                          : 'text-[#5d666e] hover:text-primary'
                      }`}
                    >
                      {h.text}
                    </button>
                  );
                })}
              </div>
            </aside>
          )}

          {/* Core Content Body */}
          <main className="flex-1 max-w-[850px] w-full">
            <article className="prose prose-slate max-w-none mb-12">
              {renderMarkdown(activeContent)}
            </article>

            {/* Dynamic Author Profile Card */}
            <div className="bg-[#f9fdfe] rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-white">
                <img
                  src={relatedDoctor ? relatedDoctor.image : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070'}
                  alt={isAmharic ? article.authorNameAm : article.authorNameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-[18px] font-bold text-secondary mb-1">
                  {isAmharic ? article.authorNameAm : article.authorNameEn}
                </h4>
                <p className="text-[12px] text-primary font-bold uppercase tracking-wider mb-3">
                  {relatedDoctor
                    ? isAmharic
                      ? t(relatedDoctor.roleKey)
                      : relatedDoctor.specialty
                    : isAmharic
                    ? 'የህክምና ባለሙያ'
                    : 'Medical Specialist'}
                </p>
                <p className="text-[#5d666e] text-[13.5px] leading-relaxed">
                  {relatedDoctor
                    ? isAmharic
                      ? relatedDoctor.descAm
                      : relatedDoctor.desc
                    : isAmharic
                    ? 'ለማህበረሰባችን ጥራት ያለው የጤና እንክብካቤ ለማቅረብ የቆረጡ የያኔት ሆስፒታል የህክምና ባለሙያ።'
                    : 'Dedicated medical professional at Yanet Primary Hospital, committed to delivering high-quality healthcare to our community.'}
                </p>

                {relatedDoctor && (
                  <button
                    onClick={() => navigate(`/doctors/${relatedDoctor.id}`)}
                    className="mt-4 text-[13px] font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5"
                  >
                    {isAmharic ? 'የዶክተር መግለጫ ይመልከቱ' : 'View Doctor Profile'} &rarr;
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default BlogDetailPage;
