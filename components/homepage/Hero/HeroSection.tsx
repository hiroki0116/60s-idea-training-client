import styles from './heroSection.module.css';
const HeroSection = () => {
  return (
    <div className={styles['banner-container']}>
      <div className={styles['input-container']}>
        <h1 className={styles['banner-title']}>
          <strong className='text-4xl'>60 seconds Idea Training</strong>
        </h1>
      </div>
      <div className={styles['info-container']} style={{display:'flex',justifyContent:'center'}}>
      </div>
  </div>
  )
}

export default HeroSection