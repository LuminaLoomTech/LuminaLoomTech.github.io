import React, { useState } from 'react';
import styles from './Contact.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/utils/animations/motionPresets';
import Header from "../../components/header/Header";

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('表單提交:', { name, email, message, contactMethod});
    alert(`感謝您的聯絡，${name}！我們會儘快回覆您。`);
    setName('');
    setEmail('');
    setMessage('');
    setContactMethod('');
  };

  return (
  <>
    <Header />
    <motion.div className={styles.spacer} {...fadeIn('up', 20, 0.6, 0.1)}>
      <div className={styles.info}>
        <h2 className={styles.title}>聯絡資訊</h2>
          <p>電話：0912-345-678</p>
          <p>Email：test@example.com</p>
          <p>地址：台北市信義區XX路XX號</p>
          <p>聯絡人:王先生</p>
          <p>服務時間:周一至周五8:00-18:00</p>
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>聯絡我們</h2>
          <div className={styles.field}>
            <label className={styles.label}>名字：</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={styles.input}
              placeholder="請輸入您的名字"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>信箱：</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="請輸入您的Email"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>其他：</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className={styles.textarea}
              rows={4}
              placeholder="請輸入您想對我們說的訊息"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>電話：</label>
            <input
              type="text"
              value={contactMethod}
              onChange={e=> setContactMethod(e.target.value)}
              className={styles.input}
              placeholder="非必填"
            />
          </div>
          <button type="submit" className={styles.button}>
            送出
          </button>
        </form>
      </div>
    </motion.div>
  </>
  );
}