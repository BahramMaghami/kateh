import Image from 'next/image'
import { Menu } from '@/components/menu'
import { Icon, RiceSprig } from '@/components/icons'
import { formatPrice, menuItems, restaurant } from '@/data/restaurant'

const featured = [
  {
    id: 'sour-chenjeh',
    image: '/images/kateh-original.jpg',
    original: true,
    label: 'با عطر گردو و رب انار',
    description: 'چنجه، گردو، رب انار و سبزیجات؛ ترکیبی با حال‌وهوای گیلان.',
  },
  {
    id: 'saffron-chicken',
    image: '/images/persian-kebab.jpg',
    label: 'طلایی و خوش‌عطر',
    description: 'جوجه‌کباب زعفرانی؛ یک انتخاب آشنا برای یک وعدهٔ دلچسب.',
  },
  {
    id: 'local-kateh',
    image: '/images/saffron-rice.jpg',
    label: 'یک سفرهٔ گیلانی',
    description: 'کته کباب محلی، کنار زیتون پرورده و مخلفات گیلانی.',
  },
]

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <div className="header-wrap" id="top">
        <header className="site-header container">
          <a className="brand" href="#top" aria-label="کته، ابتدای صفحه">
            <Image
              src="/images/kateh-logo.png"
              alt=""
              width={68}
              height={68}
              className="brand-logo"
            />
            <span className="brand-copy">
              <strong>کته</strong>
              <span>طعم خوش گیلان</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            <a href="#menu">منوی کته</a>
            <a href="#story">از کته بدانید</a>
            <a href="#visit">ارتباط با ما</a>
          </nav>
          <a className="header-cta" href="#menu">
            مهمان کته باشید <Icon name="arrow" />
          </a>
        </header>
      </div>
      <main id="main">
        <div className="green-stage">
          <section className="hero container" aria-labelledby="hero-heading">
            <div className="hero-copy">
              <p className="eyebrow light">به سفرهٔ کته خوش آمدید</p>
              <h1 id="hero-heading">
                عطر برنج،
                <br />
                <span>طعم گیلان.</span>
              </h1>
              <p className="hero-description">
                از کتهٔ خوش‌عطر تا کباب‌های دلچسب؛
                <br />
                اینجا بهانه‌ای‌ست برای کنار هم بودن.
              </p>
              <div className="hero-actions">
                <a className="button button-gold" href="#menu">
                  مشاهدهٔ منو <Icon name="arrow" />
                </a>
                <a className="text-link" href="#story">
                  قصهٔ کته{' '}
                  <span className="round-arrow">
                    <Icon name="arrow" />
                  </span>
                </a>
              </div>
              <div className="hero-footnote">
                <RiceSprig />
                <span>کته و کباب، به رسم گیلان</span>
              </div>
            </div>
            <div className="hero-visual">
              <span className="orbit orbit-one" aria-hidden="true" />
              <span className="orbit orbit-two" aria-hidden="true" />
              <div className="hero-food">
                <Image
                  src="/images/persian-kebab.jpg"
                  alt="تصویر نمونه از کباب و جوجه در کنار برنج زعفرانی"
                  fill
                  sizes="(max-width: 760px) 85vw, 520px"
                  preload
                />
              </div>
              <div className="food-stamp">
                <RiceSprig />
                <span>به رسمِ</span>
                <strong>گیلان</strong>
                <span className="stamp-dot">✦</span>
              </div>
              <span className="hero-image-label">تصویر نمونه</span>
              <span className="hero-visual-caption" aria-hidden="true">
                A TASTE OF GILAN — KATEH
              </span>
            </div>
          </section>
          <div className="hero-bottom container">
            <span>
              غذای گیلانی <i /> کباب ایرانی <i /> یک حال خوب
            </span>
            <a href="#featured" aria-label="دیدن چند طعم از کته">
              <Icon name="down" />
            </a>
            <span className="latin-label">خوش آمدید · نوش جان</span>
          </div>
        </div>
        <section
          id="featured"
          className="featured-section section-space"
          aria-labelledby="featured-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">آشنایی با طعم‌ها</p>
                <h2 id="featured-title">
                  چند طعم از <span className="serif-accent">کته</span>
                </h2>
              </div>
              <a className="subtle-link" href="#menu">
                دیدن همهٔ غذاها <Icon name="arrow" />
              </a>
            </div>
            <div className="featured-grid">
              {featured.map((feature, index) => {
                const item = menuItems.find((food) => food.id === feature.id)!
                return (
                  <article className="food-card" key={item.id}>
                    <a
                      className={`food-card-image ${feature.original ? 'original-photo' : ''}`}
                      href={`#${item.id}`}
                      aria-label={`مشاهدهٔ ${item.name} در منو`}
                    >
                      <Image
                        src={feature.image}
                        alt={
                          feature.original
                            ? 'عکس ارسالی از سرو غذا در کته'
                            : `تصویر نمونه برای معرفی ${item.name}`
                        }
                        fill
                        sizes="(max-width: 600px) 130px, (max-width: 1000px) 30vw, 380px"
                      />
                      <span className="photo-label">
                        {feature.original ? 'از سفرهٔ کته' : 'تصویر نمونه'}
                      </span>
                      <span className="card-index">{formatPrice(index + 1).padStart(2, '۰')}</span>
                    </a>
                    <div className="food-card-content">
                      <p className="food-kicker">{feature.label}</p>
                      <h3>
                        <a href={`#${item.id}`}>{item.name}</a>
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
        <section
          id="menu"
          className="menu-section section-space"
          aria-labelledby="menu-title"
        >
          <div className="container">
            <div className="menu-heading">
              <RiceSprig />
              <p className="eyebrow">برای هر سلیقه، یک طعم</p>
              <h2 id="menu-title">امروز چی میل دارید؟</h2>
              <p>از میان کباب‌ها و کته‌های ما انتخاب کنید.</p>
            </div>
            <Menu />
            <p className="menu-note">
              <Icon name="info" />
              قیمت‌ها از منوی ارسالی رستوران درج شده‌اند و برای نسخهٔ نهایی نیاز
              به تأیید دارند.
            </p>
          </div>
        </section>
        <section
          id="story"
          className="story-section section-space"
          aria-labelledby="story-title"
        >
          <div className="container story-grid">
            <div className="story-art">
              <div className="story-photo">
                <Image
                  src="/images/saffron-rice.jpg"
                  alt="تصویر نمونه از سفرهٔ ایرانی با برنج زعفرانی و مخلفات"
                  fill
                  sizes="(max-width: 760px) 90vw, 500px"
                />
                <span className="photo-label">تصویر نمونه</span>
              </div>
              <div className="story-caption">
                <RiceSprig />
                <span>
                  ساده، صمیمی،
                  <br />
                  <strong>به رسم گیلان.</strong>
                </span>
              </div>
            </div>
            <div className="story-copy">
              <p className="eyebrow">از کته بدانید</p>
              <h2 id="story-title">
                بعضی طعم‌ها،
                <br />
                آدم را دور هم جمع می‌کنند.
              </h2>
              <p>
                برای ما، نام کته یادآور یک سفرهٔ صمیمی‌ست؛ عطر برنج و طعم کباب،
                کنار آدم‌هایی که دوستشان داریم.
              </p>
              <p>
                کته، رستورانی تازه با غذاهای گیلانی و کباب‌های ایرانی است. منوی
                ما را ببینید و طعم دلخواهتان را برای دورهمی بعدی پیدا کنید.
              </p>
              <a className="subtle-link" href="#menu">
                سفرهٔ کته را ببینید <Icon name="arrow" />
              </a>
              <span className="story-signature">کته، به وقتِ با هم بودن</span>
            </div>
          </div>
        </section>
        <section
          id="visit"
          className="visit-section"
          aria-labelledby="visit-title"
        >
          <div className="container visit-grid">
            <div>
              <p className="eyebrow light">یک جای خالی برای شما</p>
              <h2 id="visit-title">مهمان کته باشید.</h2>
              <p>برای یک وعدهٔ خوش‌طعم و یک دورهمی صمیمی.</p>
              <a className="button button-gold" href="#menu">
                قبل از آمدن، منو را ببینید <Icon name="arrow" />
              </a>
            </div>
            <div className="contact-list">
              <div className="contact-row">
                <Icon name="pin" />
                <div>
                  <h3>نشانی رستوران</h3>
                  <p>{restaurant.address ?? 'نشانی و مسیریابی به‌زودی'}</p>
                  {restaurant.mapUrl && (
                    <a
                      href={restaurant.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      مسیریابی <Icon name="arrow" />
                    </a>
                  )}
                </div>
              </div>
              <div className="contact-row">
                <Icon name="clock" />
                <div>
                  <h3>ساعت پذیرایی</h3>
                  <p>{restaurant.hours ?? 'ساعت کاری به‌زودی اعلام می‌شود'}</p>
                </div>
              </div>
              <div className="contact-row">
                <Icon name="phone" />
                <div>
                  <h3>تماس با کته</h3>
                  {restaurant.phone ? (
                    <a href={`tel:${restaurant.phone}`} dir="ltr">
                      {restaurant.phone}
                    </a>
                  ) : (
                    <p>اطلاعات تماس به‌زودی</p>
                  )}
                </div>
              </div>
              {restaurant.instagramUrl && (
                <a
                  className="subtle-link"
                  href={restaurant.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  کته در اینستاگرام <Icon name="arrow" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#top" className="footer-brand">
            کته <span>طعم خوش گیلان</span>
          </a>
          <span className="preview-label">
            <span /> پیش‌نمایش پیشنهادی
          </span>
          <a className="back-top" href="#top">
            بازگشت به بالا <Icon name="up" />
          </a>
        </div>
      </footer>
      <nav className="mobile-bar" aria-label="دسترسی سریع">
        <a href="#menu">
          <Icon name="menu" />
          مشاهدهٔ منو
        </a>
        <a href={restaurant.phone ? `tel:${restaurant.phone}` : '#visit'}>
          <Icon name="phone" />
          {restaurant.phone ? 'تماس با کته' : 'ارتباط با کته'}
        </a>
      </nav>
    </>
  )
}
