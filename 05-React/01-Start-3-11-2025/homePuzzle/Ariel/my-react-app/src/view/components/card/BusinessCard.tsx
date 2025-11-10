import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import styles from './BusinessCard.module.scss';

function BusinessCard() {
  return (
    <div className="business-card">
      <h2 className="business-card__title">Please contact me:</h2>
      
      <p className="business-card__email">izari7@outlook.com</p>
      <p className="business-card__phone">+972-548114905</p>
      
      <div className="business-card__social">
        <a href="https://github.com/arielizraelov" 
           target="_blank" 
           rel="noopener noreferrer"
           className="business-card__social-link">
          <FaGithub className="business-card__icon business-card__icon--github" size={40} />
        </a>
        <a href="https://www.linkedin.com/in/ariel-izraelov" 
           target="_blank" 
           rel="noopener noreferrer"
           className="business-card__social-link">
          <FaLinkedin className="business-card__icon business-card__icon--linkedin" size={40} />
        </a>
        <a href="https://wa.me/972548114905" 
           target="_blank" 
           rel="noopener noreferrer"
           className="business-card__social-link">
          <FaWhatsapp className="business-card__icon business-card__icon--whatsapp" size={40} />
        </a>
      </div>
    </div>
  )
}

export default BusinessCard;