import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { blogArticles } from '../../data/blogData';

const CATEGORIES_EN = ['All', 'Cardiology', 'Nutrition', 'Pediatrics', 'Surgery', 'Mental Health', 'Preventive Care'];
const CATEGORIES_AM = ['ሁሉም', 'ልብ', 'አመጋገብ', 'ህፃናት', 'ቀዶ ጥገና', 'አዕምሮ ጤና', 'ፕሪቬንቲቭ'];

const ShareButtons = ({ title }: { title: string }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
      <span className="text-[11px] font-bold text-[#8c949c] uppercase tracking-wider mr-1">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="w-7 h-7 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="w-7 h-7 rounded-full bg-black/5 hover:bg-black text-black/60 hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on X/Twitter"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank" rel="noopener noreferrer"
        className="w-7 h-7 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>
      <button
        onClick={handleCopy}
        className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all"
        aria-label="Copy link"
      >
        <Link2 className="w-3.5 h-3.5" />
      </button>
      {copied && <span className="text-[11px] text-primary font-bold">Copied!</span>}
    </div>
  );
};

const HealthBlog = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const categories = isAmharic ? CATEGORIES_AM : CATEGORIES_EN;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allBlogs, setAllBlogs] = useState(blogArticles);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/blogs');
        if (res.ok) {
          const data = await res.json();
          const dbBlogs = data.map((b: any) => ({
            id: 'db-' + b.id.toString(),
            categoryEn: b.category,
            categoryAm: b.categoryAm || b.category,
            titleEn: b.title,
            titleAm: b.titleAm || b.title,
            excerptEn: b.content.substring(0, 120) + '...',
            excerptAm: b.contentAm ? b.contentAm.substring(0, 120) + '...' : b.content.substring(0, 120) + '...',
            image: b.image,
            dateEn: b.date,
            dateAm: b.date, // You could format this to Amharic if needed
            authorId: b.authorId.toString(),
            authorNameEn: b.doctor ? b.doctor.name : 'Consultant Doctor',
            authorNameAm: b.doctor && b.doctor.nameAm ? b.doctor.nameAm : (b.doctor ? b.doctor.name : 'አማካሪ ዶክተር'),
            readMin: Math.ceil(b.content.split(' ').length / 200) || 5,
            contentEn: b.content,
            contentAm: b.contentAm || b.content,
          }));
          
          // Merge avoiding duplicates if any, but since DB IDs are numbers and static are strings like '1', '2' they won't overlap if we're careful.
          // Let's just prepend DB blogs to static blogs.
          setAllBlogs([...dbBlogs, ...blogArticles]);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = allBlogs.filter(a => {
    const cat = isAmharic ? a.categoryAm : a.categoryEn;
    const title = isAmharic ? a.titleAm : a.titleEn;
    const matchesCat = activeCategory === categories[0] || cat === activeCategory;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="pt-[60px] pb-[80px] bg-[#f9fdfe]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-title text-center !mb-10">
          <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
            {isAmharic ? 'የጤና ጦማሮቻችን' : 'HEALTH BLOG'}
          </span>
          <h2 className="text-secondary text-[30px] font-bold mt-2">
            {isAmharic ? 'የጤና ጽሑፎች እና ምክሮች' : 'Expert Health Articles & Tips'}
          </h2>
          <p className="text-[14px] text-[#5d666e] max-w-[600px] mx-auto mt-3">
            {isAmharic
              ? 'በሆስፒታላችን ዶክተሮች እና ባለሙያዎች የተዘጋጁ ትምህርታዊ እና ተግባራዊ የጤና ጽሑፎች።'
              : 'Educational and practical health articles written by our clinical experts and specialist doctors.'}
          </p>
        </div>

        {/* Search + Categories */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 mb-10">
          {/* Search */}
          <div className="relative w-full lg:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c949c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isAmharic ? 'ጽሑፍ ፈልግ...' : 'Search articles...'}
              className="w-full bg-white border border-gray-100 rounded-full pl-10 pr-4 py-3 text-[13px] text-secondary placeholder:text-[#8c949c] focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                    : 'bg-white text-[#5d666e] border-gray-100 hover:border-primary/30 hover:text-primary'
                }`}
              >
                <Tag className="w-3 h-3" />
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#8c949c] text-[14px]">
            {isAmharic ? 'ምንም ጽሑፍ አልተገኘም።' : 'No articles found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {filtered.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="group bg-white rounded-[15px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[220px]">
                  <Link to={`/blog/${article.id}`}>
                    <img
                      src={article.image}
                      alt={isAmharic ? article.titleAm : article.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                      {isAmharic ? article.categoryAm : article.categoryEn}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {article.readMin} {isAmharic ? 'ደቂቃ' : 'min read'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-[28px] flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-3 text-[13px] text-[#8c949c]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{isAmharic ? article.dateAm : article.dateEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>{isAmharic ? article.authorNameAm : article.authorNameEn}</span>
                    </div>
                  </div>

                  <Link to={`/blog/${article.id}`}>
                    <h3 className="text-[17px] font-bold text-secondary leading-snug mb-3 group-hover:text-primary transition-colors">
                      {isAmharic ? article.titleAm : article.titleEn}
                    </h3>
                  </Link>

                  <p className="text-[13px] text-[#5d666e] leading-relaxed mb-4 flex-grow">
                    {isAmharic ? article.excerptAm : article.excerptEn}
                  </p>

                  <Link to={`/blog/${article.id}`} className="flex items-center gap-2 text-primary font-bold text-[13px] group/link">
                    {isAmharic ? 'ሙሉ ጽሑፍ አንብብ' : 'Read Full Article'}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {/* Social Sharing */}
                  <ShareButtons title={isAmharic ? article.titleAm : article.titleEn} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthBlog;
