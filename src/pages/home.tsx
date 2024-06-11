import { Fade } from "react-awesome-reveal"
import { Link } from "react-router-dom"

function Home() {
  return (
    <section>
      <div className="container mx-auto md:px-24 flex flex-row justify-between py-32 h-[90vh]">
       <Fade direction="left" triggerOnce>
        <div className="w-1/2">
            <img src="medal.png" alt="medal image" className="w-24" />
            <h1 className="poppins pt-4 text-gray-700 font-bold text-3xl lg:text-3xl leading-relaxed">Best Quality <br/> <span className="text-5xl font-bold my-4 block">Medicine in 2024</span></h1>
            <p className="text-gray-500 text-light text-base w-[500px]">Our products are world best product.We sell the real projects.<br/> Welcome to our shop.</p>
            <button className="bg-blue-500 text-white px-8 py-2 rounded-lg mt-4"><Link to='/products'>Shop Now</Link></button>
        </div>
       </Fade>
       <Fade direction="right" triggerOnce>
          <img src="banner.png" alt="banner" className="w-full"/>
        </Fade>
      </div>
    </section>
  )
}

export default Home