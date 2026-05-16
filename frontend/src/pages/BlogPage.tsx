import BlogHero from '../components/Blog/BlogHero';
import Blog from '../components/Home/Blog';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white">
      <BlogHero />
      <div className="py-[60px]">
        <Blog />
      </div>
      
      {/* Optional: Add a newsletter section or something more premium here */}
      <section className="pb-[100px]">
        <div className="container-custom">
          <div className="bg-secondary rounded-[30px] p-[50px] md:p-[80px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white text-[35px] md:text-[45px] font-bold mb-4">
                  {t('nav.home') === 'መነሻ' ? 'የቅርብ ጊዜ የጤና ዜናዎችን ያግኙ' : 'Subscribe to Our Newsletter'}
                </h2>
                <p className="text-white/70 text-[18px]">
                  {t('nav.home') === 'መነሻ' ? 'ጠቃሚ የጤና ምክሮችን እና የሆስፒታላችንን ዜናዎች በኢሜልዎ ይላኩልዎ።' : 'Stay updated with the latest medical news and health tips from our experts.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder={t('nav.home') === 'መነሻ' ? 'ኢሜይል አድራሻ' : 'Your Email Address'}
                  className="flex-grow bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:outline-none focus:border-primary transition-all"
                />
                <button className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-primary transition-all">
                  {t('nav.home') === 'መነሻ' ? 'ይመዝገቡ' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
