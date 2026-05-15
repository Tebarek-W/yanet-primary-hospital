import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      title: "Latest Modern Technology for Medical Center",
      image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?q=80&w=2070&auto=format&fit=crop",
      date: "May 15, 2026",
      author: "Admin",
      delay: 0.1
    },
    {
      title: "How to Keep Your Heart Healthy and Fit",
      image: "https://images.unsplash.com/photo-1505751172107-57322a29344e?q=80&w=2070&auto=format&fit=crop",
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
    <section className="section-padding">
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
                
                <button className="flex items-center gap-[10px] text-primary font-bold uppercase text-[14px] group/btn">
                  Read More
                  <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover/btn:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
