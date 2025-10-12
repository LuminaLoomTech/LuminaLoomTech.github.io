import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css'; 
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animations/motionPresets';

export default function Navbar() {
    return (
        <motion.nav className='navbar' {...fadeIn('down', 20, 0.6, 0)}>
            <ul>
                <motion.li {...slideInLeft} transition={{ duration: 0.4, delay: 0.05 }}>
                    <Link to="/">首頁</Link>
                </motion.li>
                <motion.li {...slideInLeft} transition={{ duration: 0.4, delay: 0.2 }}>
                    <Link to="/about">關於我們</Link>
                </motion.li>
                <motion.li {...slideInLeft} transition={{ duration: 0.4, delay: 0.4 }}>
                    <Link to="/contact">聯絡我們</Link>
                </motion.li>
            </ul>
        </motion.nav>
    );
}
