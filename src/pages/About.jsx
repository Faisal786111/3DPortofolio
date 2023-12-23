/* eslint-disable react/jsx-key */
import CTA from "../components/CTA"
import { skills } from "../constants"

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text ">
        Hello , I'm <span className="blue-gradient_text font-semibold drop-shadow"> Faisal </span>
      </h1>

      <div className="flex flex-col mt-5 gap-5 text-slate-500">
        <p>
        MERN stack developer with a passion for creating innovative products, including Medicare. 🚀 Experienced in Spring Boot, JSP, Servlets. 💻✨
        </p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">
          My Skills
        </h3>

        <div className="flex flex-wrap gap-12 mt-16">
          {skills.map((skill)=>(
            <div className="block-container w-20 h-20">
              <div className="btn-back rounded-xl"/>
              <div className="btn-front flex  justify-center  items-center  rounded-xl">
                <img 
                src={skill.imageUrl} 
                alt={skill.name} 
                className="w-1/2 h-1/2 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />
      <CTA/>
    </section>
  )
}

export default About