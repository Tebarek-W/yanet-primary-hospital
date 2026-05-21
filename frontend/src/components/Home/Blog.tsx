import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogArticles } from '../../data/blogData';
import type { BlogArticle } from '../../data/blogData';
import { api } from '../../utils/api';

const Blog = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const [blogsToShow, setBlogsToShow] = useState<BlogArticle[]>(blogArticles.slice(0, 3));

  // Fetch latest 3 posts from API; fallback to static
  useEffect(() => {
    api.blog.getAll()
      .then((data: BlogArticle[]) => {
        if (Array.isArray(data) && data.length > 0) setBlogsToShow(data.slice(0, 3));
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  return (
    <section id="blog" className="pt-[60px] pb-[60px]">
      <div className="container-custom">
        <div className="section-title">
          <span>{t('blog_section.badge')}</span>
          <h2 className="text-secondary">{t('blog_section.title')}</h2>
          <p>
            {t('blog_section.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {blogsToShow.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-[15px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
            >
              <div className="relative overflow-hidden h-[250px]">
                <Link to={`/blog/${blog.id}`}>
                  <img 
                    src={blog.image} 
                    alt={isAmharic ? blog.titleAm : blog.titleEn} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div className="absolute top-[20px] left-[20px]">
                  <span className="bg-primary text-white px-[15px] py-[5px] rounded-full text-[12px] font-bold uppercase">
                    {isAmharic ? blog.categoryAm : blog.categoryEn}
                  </span>
                </div>
              </div>
              
              <div className="p-[30px] flex flex-col flex-grow">
                <div className="flex items-center gap-[20px] mb-[15px] text-[14px] text-body">
                  <div className="flex items-center gap-[5px]">
                    <Calendar className="w-[16px] h-[16px] text-primary" />
                    <span>{isAmharic ? blog.dateAm : blog.dateEn}</span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <User className="w-[16px] h-[16px] text-primary" />
                    <span>{t('blog_section.by')} {isAmharic ? blog.authorNameAm : blog.authorNameEn}</span>
                  </div>
                </div>
                
                <Link to={`/blog/${blog.id}`} className="flex-grow">
                  <h3 className="text-[20px] font-bold text-secondary leading-[1.4] mb-[20px] group-hover:text-primary transition-colors cursor-pointer">
                    {isAmharic ? blog.titleAm : blog.titleEn}
                  </h3>
                </Link>
                
                <Link to={`/blog/${blog.id}`} className="flex items-center gap-2 text-primary font-bold group mt-auto">
                  {t('common.read_more')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
