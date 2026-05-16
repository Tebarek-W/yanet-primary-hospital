import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = [
    {
      title: "Latest Modern Technology for Medical Center",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop",
      date: "May 15, 2026",
      author: "Admin",
      delay: 0.1
    },
    {
      title: "How to Keep Your Heart Healthy and Fit",
      image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2080&auto=format&fit=crop",
      date: "May 12, 2026",
      author: "Admin",
      delay: 0.2
    },
    {
      title: "Benefits of Regular Medical Checkups",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop",
      date: "May 10, 2026",
      author: "Admin",
      delay: 0.3
    }
  ];

  return (
    <section id="blog" className="pt-[60px] pb-[60px]">
      <div className="container-custom">
        <div className="section-title">
          <span>Our Latest News</span>
          <h2 className="text-secondary">Read Our Latest Articles</h2>
          <p>
            Stay updated with the latest medical news and health tips from our expert doctors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: blog.delay }}
              className="group bg-white rounded-[15px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative overflow-hidden h-[250px]">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-[20px] left-[20px]">
                  <span className="bg-primary text-white px-[15px] py-[5px] rounded-full text-[12px] font-bold uppercase">Medical</span>
                </div>
              </div>
              
              <div className="p-[30px]">
                <div className="flex items-center gap-[20px] mb-[15px] text-[14px] text-body">
                  <div className="flex items-center gap-[5px]">
                    <Calendar className="w-[16px] h-[16px] text-primary" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <User className="w-[16px] h-[16px] text-primary" />
                    <span>By {blog.author}</span>
                  </div>
                </div>
                
                <h3 className="text-[22px] leading-[1.4] mb-[20px] group-hover:text-primary transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                
                <Link to="/contact" className="flex items-center gap-2 text-primary font-bold group">
                  Read More
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
