import styles from './Footer.module.css'
import {AiFillGithub} from "react-icons/ai"; 
const Footer = () =>{
    return(
        <footer className={styles.footer}>
            <a href='https://github.com/ajithmn007/react' target="_blank"><AiFillGithub/>Github Code</a>
        </footer>
    )
};

export default Footer;