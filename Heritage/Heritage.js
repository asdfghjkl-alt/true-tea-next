import React from 'react';
import ProductCategoriesHeritage from '../Product/ProductCategoriesHeritage';

import './Heritage.css';

export default function Heritage() {
  return (
    <div className='container noselect'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb p-2'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Heritage
          </li>
        </ol>
      </nav>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <a href='#Tea'>Tea</a>
        </li>
        <li>
          <a href='#History'> History</a>
        </li>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <a href='#tea-china'>Tea in China</a>
          </li>
          <li>
            <a href='#tea-japan'>Tea in Japan</a>
          </li>
          <li>
            <a href='#tea-west'>Tea in the West</a>
          </li>
        </ul>
        <li>
          <a href='#tea-world'>Tea around the world</a>
        </li>
        <li>
          <a href='#tea-cat'>Tea by category</a>
        </li>
      </ul>

      <section className='row bg-white text-dark'>
        <h3 id='Tea'>Tea</h3>
        <div className='col-md-10 py-1'>
          There is introduction to Tea on{' '}
          <a href='https://www.wikipedia.org' target='_blank' rel='noreferrer'>
            Wikipedia
          </a>
          :
          <blockquote>
            <p>
              <a
                href='https://en.wikipedia.org/wiki/Tea'
                target='_blank'
                rel='noreferrer'
              >
                Tea
              </a>{' '}
              is an aromatic beverage prepared by pouring hot or boiling water
              over treated or fresh leaves of Camellia sinensis, an evergreen
              shrub native to China and East Asia.
            </p>
            <p>
              Small-leaf type tea (Camellia sinensis var. sinensis) may have
              originated in southern China possibly with hybridization of
              unknown wild teas. Large-leaf type tea in Yunnan, China (Camellia
              sinensis var. assamica) and Indian Assam-type tea has genetic
              similarities.
            </p>
            <p>
              Chinese legends attribute the invention of tea to the mythical
              Shennong from central and northern China about 2700 BC, although
              evidence suggests that tea drinking may have been introduced from
              the southwest of China (Sichuan/Yunnan areas of China).
            </p>
            <p>
              Tea drinking may have begun in the region of Yunnan, where it was
              used for medicinal purposes. It is also believed that in Sichuan,
              "people began to boil tea leaves for consumption into a
              concentrated liquid without the addition of other leaves or herbs,
              thereby using tea as a bitter yet stimulating drink, rather than
              as a medicinal concoction.
            </p>
          </blockquote>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image001.png' alt='wikipedia' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            In the earliest botanical book classify and naming the species
            scientifically ‘The Species of Plants’ published 1753, the Swedish
            botanist Carl Linnaeus named tea as ‘Thea sinensis L’, later changed
            to ‘Camellia sinensis’, where sinensis in Latin means China.
          </p>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/Picture1.jpg' alt='wikipedia' id='img-w100' />
        </div>
      </section>

      <section className='row bg-white text-dark'>
        <h3 id='History'>History</h3>
        <h5 id='tea-china'>Tea in China</h5>
        <div className='col-md-10 py-1'>
          In his immortal book The Classic of Tea 《茶经》, LU Yu (about Ad 733
          – 804, Tang Dynasty), the widely regarded Tea Saint, wrote:
          <blockquote>
            <p>
              'Tea is a precious evergreen tree found in South China. It varies
              from one or two Chinese feet (chi – 33.3cm) to several tens of
              feet.'
            </p>
            <p>
              'Because tea is by nature cool, it makes most suitable drink.
              Those who attend to their behavior and are of frugal character and
              who may feel hot and thirsty, or out of sort, or have a headache,
              or irritation of the eye, or fatigue of the limbs, or discomfort
              of the joints, merely need to drink four or five mouthful of tea
              and it will achieve much the same effect as drinking refined
              curds.'
            </p>
            <p>
              ‘Drinking tea that has not been picked in time, that has not been
              prepared with care, or that has been mixed with wild tea will
              cause illness.’
            </p>
          </blockquote>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image003.jpg' alt='LuYu pic' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            This book covered all the major topics in Tea, it has ten chapters,
            covering 1. The origins of tea, 2. The tools used in picking and
            manufacturing tea, 3. The manufacturing of tea, 4. Vessels of making
            and drinking tea, 5. Tea boiling, 6. Tea drinking, 7. Historic
            materials on tea, 8. Tea production areas, 9. Simplification on tea
            drinking, 10. Hanging Scrolls for tearoom.
          </p>
          <p>
            This book is well regarded as the foundation of tea culture in China
            even today, it is still used as number 1 teaching material on tea
            and tea culture.
          </p>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image004.jpg' alt='LuYu book' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            Tea has been so impactful to life and society, ZHAO Ji (Ad 1082 –
            1135), the art gifted emperor of Song Dynasty, has personally wrote
            a book on tea ‘On Tea in DaGuan’ 《大观茶论》.
          </p>
          <p>
            The tea was produced and pressed to small tea cakes in his time, it
            was grounded to powder before being prepared, as DianCha 点茶, which
            is very close to the Matcha 抹茶 in Japan today.
          </p>
          <div className='d-md-block' align='center'>
            <img
              src='/img/Heritage/image007.jpg'
              alt='LuYu book'
              id='img-w20'
            />
          </div>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image006.jpg' alt='LuYu book' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            The tea was ordered to be made in loose tea 散茶 by ZHU YuanZhang
            (Ad 1328 – 1398), the first emperor of Ming Dynasty, in order to
            stop the over extravagant trend in tea. The loose tea is still the
            most popular form of teas in China today.
          </p>
          <div className='d-md-block' align='center'>
            <img
              src='/img/Heritage/image009.jpg'
              id='img-w20'
              alt='LuYu book'
            />
          </div>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image008.jpg' alt='LuYu book' id='img-w100' />
        </div>
        <h5 id='tea-japan'>Tea in Japan</h5>
        <p>
          It is generally believed tea was brought to Japan from China in the
          Tang dynasty (Ad 618 – 907). It has gone through times and played a
          very big part in the Japan history, and it has deeply woven into
          Japanese culture.
        </p>
        <p>
          Murata Juko is known in chanoyu history as an early developer of tea
          making as a spiritual practice. He studied Zen under the monk Ikkyu,
          who revitalized Zen in the 15th century, and this is considered to
          have influenced his concept of chanoyu. By the 16th century, tea
          drinking had spread to all levels of society in Japan.
        </p>
        <div className='col-md-10 py-1'>
          <p>
            Sen no Rikyu (Ad 1522 – 1591) has been the most famous person and is
            regarded as Tea saint in Japan. He carried on the studies of
            Japanese Monks in the Zen and had tea as a spiritual practice. The
            principles he set forward for the Japanese Way of Tea (teaism) —
            Harmony (和, wa), Respect (敬, kei), Purity (清, sei), and
            Tranquility (寂, jaku) — are still central to the Way of Tea in
            Japan. It has profound impact to many aspects of Japan life.
          </p>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image010.jpg' alt='Juko' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            Also to mention is ‘The Book of Tea’ (茶の本), published 1906 by
            Okakura Kakuzo, a very well- regarded English book, introducing not
            only the Japanese Way of Tea, but also the aesthetic and cultural
            characters ofJapanese life.
          </p>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image011.jpg' alt='Book Tea' id='img-w100' />
        </div>
        <h5 id='tea-west'>Tea in the West</h5>
        <p>
          Tea had been trading from China to the West for long time. Portuguese
          and Dutch imported tea from China over the sea from the 17th century.
          Tea trading has been important for the Dutch East India Company and
          then the British East India Company. It was believed that the Tea
          first appeared in the English document as early as 1658, it had been
          called Tcha, Tay, Tee as well.
        </p>
        <p>
          The tea was first sold as a healthy drink for high classes, something
          almighty from East that can cure many diseases.
        </p>
        <div className='col-md-10 py-1'>
          <p>
            1662, Queen Catherine of Braganza (Ad 1638 – 1705) from Portugal, a
            tea enthusiast, married to the King Charles II of England (Ad 1630 –
            1685). She carried some Lapsang Souchong (正山小種紅茶), as her
            dowry, and use it as top treatment to cater the royals and elites.
            With her influence, tea starts to spread in the high classes. By the
            18th century, the position of tea was said to have surpassed that of
            the wine in England, many elegant tea events started to appear.
          </p>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image013.jpg' alt='Book Tea' id='img-w100' />
        </div>
        <div className='col-md-10 py-1'>
          <p>
            Anna Maria Russell, Duchess of Bedford (Ad 1783 – 1857), a lifelong
            friend of Queen Victoria, served as a Lady of the Queen’s Bedchamber
            between 1837 and 1841, she started the British meal "afternoon tea"
            around 1840.
          </p>
          <div className='d-md-block' align='center'>
            <img src='/img/Heritage/image015.jpg' alt='Book Tea' id='img-w20' />
          </div>
        </div>
        <div className='col-md-2 py-1'>
          <img src='/img/Heritage/image014.jpg' alt='Book Tea' id='img-w100' />
        </div>
        <div className='col-md-8'>
          <p>
            Robert Fortune (Ad 1812 –1880), a Scottish botanist, plant hunter
            and traveller, introduced around 250 new ornamental plants and tea,
            mainly from China, but also Japan, into the gardens of Britain,
            Australia, and the USA. He also played a role in the development of
            the tea industry in India in the 19th century.
          </p>
        </div>

        <div className='col-md-4 py-1'>
          <img src='/img/Heritage/image018c.jpg' alt='Book Tea' id='img-w100' />
        </div>
      </section>

      <section className='row bg-white text-dark'>
        <h3 id='tea-world'>Tea around the world</h3>
        <p>
          Base on the report of the Food and Agriculture Organization of the
          United Nations on 2015, the tea production has been growing very
          rapidly. The global tea production on 2013 has been more than 5
          million tons and covering many countries/areas.
        </p>
        <div className='col-md-6'>
          <img src='/img/Heritage/image019.png' alt='tea prod' id='img-w100' />
        </div>
        <div className='col-md-6'>
          <img src='/img/Heritage/image021.png' alt='tea prod' id='img-w100' />
        </div>
        <div className='col-md-6'>
          <img src='/img/Heritage/image023.png' alt='tea prod' id='img-w100' />
        </div>
      </section>

      <section className='bg-white text-dark'>
        <h3 id='tea-cat'>Tea by category</h3>
        <p>
          As stated in the Wikipedia,{' '}
          <a
            href='https://en.wikipedia.org/wiki/Tea'
            target='_blank'
            rel='noreferrer'
          >
            tea
          </a>{' '}
          is generally divided into categories based on how it is processed
          during production. At least six different types are produced:
        </p>

        <figure style={{ textAlign: 'center' }}>
          <img src='/img/Heritage/image025.png' alt='tea prod' id='img-w80' />
        </figure>

        <ProductCategoriesHeritage />

        <ol className='d-none'>
          <li>
            White Tea: Camellia sinensis (small-leaf tea) or Camellia sinensis
            var. assam (large-leaf tea) leaves and buds, made after being picked
            and withered under the sun without baking or steaming, very lightly
            rolling or not at all, then dried.
          </li>
          <li>
            Yellow Tea: Camellia sinensis (small-leaf tea) leaves, go through
            the process of withering, rolling and pressing, baking or steaming,
            with an added step of enclosing for light fermentation, then dried.
          </li>
          <li>
            Green Tea: Camellia sinensis (small-leaf tea) leaves, go through the
            process of withering, rolling and pressing, baking or steaming, and
            then drying, without fermentation.
          </li>
          <li>
            Oolong Tea: Particular Camellia sinensis (small-leaf or medium-leaf
            tea) species tea leaves, go through complicated processes including
            repeated withering, green-making, baking, rolling and pressing,
            further repeated baking, then drying. The process green-making gets
            the tea partial fermented through controlled oxidation, the further
            repeated baking over fire helps to achieve particular flavors.
          </li>
          <li>
            Black Tea: Camellia sinensis (small-leaf tea) or Camellia sinensis
            var. asemia (large-leaf tea) leaves, go through the process
            withering, rolling, pressing, fermentation, then dried.
          </li>
          <li>
            Dark Tea: Camellia sinensis var. assam (large-leaf tea) leaves,
            post-fermented by its original definition, where picked tea leaves
            is pressed into shape and dried after withering, rolling, pressing
            and steaming, then sold and transported, the pressed tea will then
            undergo a natural process of gradual fermentation and maturation
            with time.
          </li>
        </ol>

        <p>
          Different teas attribute their characters from many factors: tea
          species, environments of growth (their region of production), tea
          harvest (season, time of day, manual or mechanical, etc.), production
          processing such as rolling and pressing, baking or steaming,
          fermentation, drying and post-production storage (post-fermentation
          and aging, etc.).
        </p>
        <p>
          The tea brewing (steeping) will demonstrate the charm and benefit of
          the teas. The process to prepare and enjoy the tea is the art of tea.
        </p>
        <p>
          Tea comes from history, soaked with cultural and spiritual heritage,
          it belongs to common same as it belongs to royal.
        </p>
      </section>
    </div>
  );
}
