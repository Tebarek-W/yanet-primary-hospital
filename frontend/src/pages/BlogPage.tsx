import BlogHero from '../components/Blog/BlogHero';
import HealthBlog from '../components/Blog/HealthBlog';
import AwarenessCampaigns from '../components/Blog/AwarenessCampaigns';
import MediaHub from '../components/Blog/MediaHub';
import Announcements from '../components/Blog/Announcements';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  return (
    <div className="bg-white">
      <BlogHero />

      {/* 1. Health Blog — searchable, categorized articles with social share */}
      <HealthBlog />

      {/* 2. Awareness Campaigns */}
      <AwarenessCampaigns />

      {/* 3. Media Hub — Video, Audio, Radio, Events & Workshops */}
      <MediaHub />

      {/* 4. Announcements — New Doctors, Equipment, Services */}
      <Announcements />

      {/* Newsletter CTA */}
      <section className="pb-[100px]">
        <div className="container-custom">
          <div className="bg-secondary rounded-[30px] p-[50px] md:p-[80px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white text-[35px] md:text-[45px] font-bold mb-4">
                  {isAmharic ? 'የቅርብ ጊዜ የጤና ዜናዎችን ያግኙ' : 'Subscribe to Our Newsletter'}
                </h2>
                <p className="text-white/70 text-[18px]">
                  {isAmharic ? 'ጠቃሚ የጤና ምክሮችን እና የሆስፒታላችንን ዜናዎች በኢሜልዎ ይላኩልዎ።' : 'Stay updated with the latest medical news and health tips from our experts.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={isAmharic ? 'ኢሜይል አድራሻ' : 'Your Email Address'}
                  className="flex-grow bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:outline-none focus:border-primary transition-all"
                />
                <button className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-primary transition-all">
                  {isAmharic ? 'ይመዝገቡ' : 'Subscribe Now'}
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
