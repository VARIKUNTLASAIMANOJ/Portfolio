import { FileText, Github, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Varikuntla Sai Manoj | All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/VARIKUNTLASAIMANOJ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/varikuntla-sai-manoj-082b782b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Linkedin />
            </a>
            <a
              href="https://varikuntlasaimanojresume.tiiny.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FileText />
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

