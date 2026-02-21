import Image from "next/image";
import Link from "next/link";
import ZoomableImage from "@/components/ui/ZoomableImage";

export const metadata = {
  title: "Heritage | True Tea",
  description: "The history, culture, and varieties of tea around the world.",
};

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-emerald-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[url('/pattern.png')] bg-cover bg-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-emerald-900/80"></div>
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
            Tea Heritage
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Discover the rich history, cultural significance, and diverse
            varieties of tea from China, Japan, and the world.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-emerald-800 font-medium" aria-current="page">
                Heritage
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation (Table of Contents) */}
        <aside className="lg:w-1/4">
          <div className="sticky top-40 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">
              Contents
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li>
                <a
                  href="#tea"
                  className="hover:text-emerald-600 transition-colors block"
                >
                  What is Tea?
                </a>
              </li>
              <li>
                <a
                  href="#history"
                  className="hover:text-emerald-600 transition-colors block"
                >
                  History
                </a>
                <ul className="pl-4 mt-2 space-y-2 border-l-2 border-emerald-50">
                  <li>
                    <a
                      href="#tea-china"
                      className="hover:text-emerald-600 transition-colors block"
                    >
                      Tea in China
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tea-japan"
                      className="hover:text-emerald-600 transition-colors block"
                    >
                      Tea in Japan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tea-west"
                      className="hover:text-emerald-600 transition-colors block"
                    >
                      Tea in the West
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#tea-world"
                  className="hover:text-emerald-600 transition-colors block"
                >
                  Tea Around the World
                </a>
              </li>
              <li>
                <a
                  href="#tea-cat"
                  className="hover:text-emerald-600 transition-colors block"
                >
                  Tea by Category
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:w-3/4 space-y-16">
          {/* Section: What is Tea? */}
          <section
            id="tea"
            className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 inline-block rounded-full"></span>
              Tea
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-600">
              <p>
                There is simple but detailed introduction to Tea on{" "}
                <a
                  href="https://www.wikipedia.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Wikipedia
                </a>
                :
              </p>
              <blockquote className="border-l-4 border-emerald-400 bg-emerald-50/50 p-6 rounded-r-xl italic my-6 shadow-sm">
                <p className="mb-4">
                  <a
                    href="https://en.wikipedia.org/wiki/Tea"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-semibold underline decoration-emerald-300"
                  >
                    Tea
                  </a>{" "}
                  is an aromatic beverage prepared by pouring hot or boiling
                  water over treated or fresh leaves of Camellia sinensis, an
                  evergreen shrub native to China and East Asia.
                </p>
                <p className="mb-4">
                  Small-leaf type tea (Camellia sinensis var. sinensis) may have
                  originated in southern China possibly with hybridization of
                  unknown wild teas. Large-leaf type tea in Yunnan, China
                  (Camellia sinensis var. assamica) and Indian Assam-type tea
                  has genetic similarities.
                </p>
                <p className="mb-4">
                  Chinese legends attribute the invention of tea to the mythical
                  Shennong from central and northern China about 2700 BC,
                  although evidence suggests that tea drinking may have been
                  introduced from the southwest of China (Sichuan/Yunnan areas
                  of China).
                </p>
                <p>
                  Tea drinking may have begun in the region of Yunnan, where it
                  was used for medicinal purposes. It is also believed that in
                  Sichuan, &quot;people began to boil tea leaves for consumption
                  into a concentrated liquid without the addition of other
                  leaves or herbs, thereby using tea as a bitter yet stimulating
                  drink, rather than as a medicinal concoction.&quot;
                </p>
              </blockquote>

              <div className="flex flex-col md:flex-row gap-8 items-start my-8">
                <div className="flex-1">
                  <p>
                    In the earliest botanical book classify and naming the
                    species scientifically &apos;The Species of Plants&apos;
                    published 1753, the Swedish botanist Carl Linnaeus named tea
                    as &apos;Thea sinensis L&apos;, later changed to
                    &apos;Camellia sinensis&apos;, where sinensis in Latin means
                    China.
                  </p>
                </div>
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-square">
                    <Image
                      src="/Heritage/Picture1.jpg"
                      alt="Camellia sinensis botanical illustration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: History */}
          <section id="history" className="scroll-mt-40">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 inline-block rounded-full"></span>
              History
            </h2>

            {/* Subsection: Tea in China */}
            <div
              id="tea-china"
              className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50 mb-8"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Tea in China
              </h3>
              <div className="prose prose-emerald max-w-none text-gray-600">
                <p>
                  In his immortal book <em>The Classic of Tea</em> 《茶经》, Lu
                  Yu (about AD 733 – 804, Tang Dynasty), the widely regarded Tea
                  Saint, wrote:
                </p>

                <blockquote className="border-l-4 border-emerald-400 bg-emerald-50/50 p-6 rounded-r-xl italic my-6 shadow-sm">
                  <p className="mb-4">
                    &apos;Tea is a precious evergreen tree found in South China.
                    It varies from one or two Chinese feet (chi – 33.3cm) to
                    several tens of feet.&apos;
                  </p>
                  <p className="mb-4">
                    &apos;Because tea is by nature cool, it makes most suitable
                    drink. Those who attend to their behavior and are of frugal
                    character and who may feel hot and thirsty, or out of sort,
                    or have a headache, or irritation of the eye, or fatigue of
                    the limbs, or discomfort of the joints, merely need to drink
                    four or five mouthful of tea and it will achieve much the
                    same effect as drinking refined curds.&apos;
                  </p>
                  <p>
                    &apos;Drinking tea that has not been picked in time, that
                    has not been prepared with care, or that has been mixed with
                    wild tea will cause illness.&apos;
                  </p>
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-3/4">
                    <Image
                      src="/Heritage/image003.jpg"
                      alt="Lu Yu statue"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-3/4">
                    <Image
                      src="/Heritage/image004.jpg"
                      alt="Classic of Tea book excerpt"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <p>
                  This book covered all the major topics in Tea. It has ten
                  chapters, covering: 1. The origins of tea, 2. The tools used
                  in picking and manufacturing tea, 3. The manufacturing of tea,
                  4. Vessels of making and drinking tea, 5. Tea boiling, 6. Tea
                  drinking, 7. Historic materials on tea, 8. Tea production
                  areas, 9. Simplification on tea drinking, 10. Hanging Scrolls
                  for tearoom.
                </p>
                <p>
                  This book is well regarded as the foundation of tea culture in
                  China. Even today, it is still used as the number 1 teaching
                  material on tea and tea culture.
                </p>

                <div className="flex flex-col md:flex-row gap-8 items-center my-8 bg-gray-50 p-6 rounded-xl">
                  <div className="flex-1">
                    <p>
                      Tea has been so impactful to life and society, Zhao Ji (AD
                      1082 – 1135), the art-gifted emperor of the Song Dynasty,
                      personally wrote a book on tea,{" "}
                      <em>&apos;On Tea in DaGuan&apos;</em> 《大观茶论》.
                    </p>
                    <p className="mt-4">
                      Tea was produced and pressed into small tea cakes in his
                      time. It was ground to powder before being prepared, known
                      as DianCha 点茶, which is very close to the Matcha 抹茶 in
                      Japan today.
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 flex border border-emerald-100 p-2 bg-white rounded shadow-sm">
                    <Image
                      src="/Heritage/image006.jpg"
                      alt="Song Dynasty Tea Serving"
                      width={300}
                      height={400}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center mt-8">
                  <div className="flex-1">
                    <p>
                      Tea was ordered to be made in loose tea form 散茶 by Zhu
                      YuanZhang (AD 1328 – 1398), the first emperor of the Ming
                      Dynasty, in order to stop the over-extravagant trend in
                      tea preparation. Loose tea is still the most popular form
                      of tea in China today.
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 flex border border-emerald-100 p-2 bg-white rounded shadow-sm">
                    <Image
                      src="/Heritage/image008.jpg"
                      alt="Ming Dynasty Teapot"
                      width={300}
                      height={400}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection: Tea in Japan */}
            <div
              id="tea-japan"
              className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50 mb-8"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Tea in Japan
              </h3>
              <div className="prose prose-emerald max-w-none text-gray-600">
                <p>
                  It is generally believed tea was brought to Japan from China
                  in the Tang dynasty (AD 618 – 907). It has gone through times
                  and played a very big part in the Japan history, and it has
                  deeply woven into Japanese culture.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-start my-8">
                  <div className="w-full md:w-1/3 shrink-0">
                    <div className="relative rounded-xl overflow-hidden shadow-md aspect-square">
                      <Image
                        src="/Heritage/image010.jpg"
                        alt="Murata Juko"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <p>
                      Murata Juko is known in chanoyu history as an early
                      developer of tea making as a spiritual practice. He
                      studied Zen under the monk Ikkyu, who revitalized Zen in
                      the 15th century, and this is considered to have
                      influenced his concept of chanoyu. By the 16th century,
                      tea drinking had spread to all levels of society in Japan.
                    </p>
                    <p>
                      Sen no Rikyu (AD 1522 – 1591) has been the most famous
                      person and is regarded as Tea Saint in Japan. He carried
                      on the studies of Japanese Monks in Zen and treated tea as
                      a spiritual practice. The principles he set forward for
                      the Japanese Way of Tea (teaism) — Harmony (和, wa),
                      Respect (敬, kei), Purity (清, sei), and Tranquility (寂,
                      jaku) — are still central to the Way of Tea in Japan. It
                      has profound impact on many aspects of Japanese life.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center py-6 px-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="flex-1">
                    <p className="m-0 italic text-emerald-900">
                      Also to mention is{" "}
                      <strong>&apos;The Book of Tea&apos;</strong> (茶の本),
                      published 1906 by Okakura Kakuzo, a very well-regarded
                      English book, introducing not only the Japanese Way of
                      Tea, but also the aesthetic and cultural characters of
                      Japanese life.
                    </p>
                  </div>
                  <div className="w-24 md:w-32 shrink-0 drop-shadow-lg">
                    <Image
                      src="/Heritage/image011.jpg"
                      alt="The Book of Tea"
                      width={150}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection: Tea in the West */}
            <div
              id="tea-west"
              className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Tea in the West
              </h3>
              <div className="prose prose-emerald max-w-none text-gray-600">
                <p>
                  Tea had been trading from China to the West for a long time.
                  Portuguese and Dutch imported tea from China over the sea from
                  the 17th century. Tea trading has been important for the Dutch
                  East India Company and then the British East India Company. It
                  was believed that Tea first appeared in English documents as
                  early as 1658, going by names like Tcha, Tay, or Tee.
                </p>
                <p>
                  Tea was first sold as a healthy drink for the high classes,
                  something almighty from the East that could cure many
                  diseases.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-10 items-center">
                  <div className="order-2 md:order-1 relative rounded-xl overflow-hidden shadow-md aspect-4/3 bg-gray-50">
                    <Image
                      src="/Heritage/image013.jpg"
                      alt="Queen Catherine of Braganza"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <p>
                      In 1662, Queen Catherine of Braganza (AD 1638 – 1705) from
                      Portugal, a tea enthusiast, married King Charles II of
                      England (AD 1630 – 1685). She carried Lapsang Souchong
                      (正山小種紅茶) as part of her dowry and used it as top
                      treatment to cater to the royals and elites. With her
                      influence, tea began to spread in the high classes. By the
                      18th century, the position of tea was said to have
                      surpassed that of wine in England, and many elegant tea
                      events started to appear.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 my-10 items-center">
                  <div>
                    <p>
                      Anna Maria Russell, Duchess of Bedford (AD 1783 – 1857), a
                      lifelong friend of Queen Victoria who served as a Lady of
                      the Queen&apos;s Bedchamber between 1837 and 1841, started
                      the beloved British meal &quot;afternoon tea&quot; around
                      1840.
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 relative rounded-xl overflow-hidden shadow-md aspect-square bg-white">
                      <Image
                        src="/Heritage/image014.jpg"
                        alt="Duchess of Bedford"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 relative rounded-xl overflow-hidden shadow-md aspect-square bg-white">
                      <Image
                        src="/Heritage/image015.jpg"
                        alt="Teacup illustration"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-800 text-teal-50 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center shadow-lg mt-8">
                  <div className="flex-1">
                    <p className="m-0 leading-relaxed">
                      Robert Fortune (AD 1812 – 1880), a Scottish botanist,
                      plant hunter and traveller, introduced around 250 new
                      ornamental plants and tea, mainly from China, but also
                      Japan, into the gardens of Britain, Australia, and the
                      USA. He also played a vital role in the development of the
                      tea industry in India in the 19th century.
                    </p>
                  </div>
                  <div className="w-32 shrink-0 relative rounded-full overflow-hidden shadow-2xl border-2 border-emerald-600 aspect-square">
                    <Image
                      src="/Heritage/image018c.jpg"
                      alt="Robert Fortune portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Tea Around The World */}
          <section
            id="tea-world"
            className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 inline-block rounded-full"></span>
              Tea Around the World
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-600 mb-8">
              <p>
                Based on the report of the Food and Agriculture Organization of
                the United Nations in 2015, global tea production has been
                growing very rapidly. Global tea production in 2013 was more
                than 5 million tons, covering many countries and regions
                worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                <ZoomableImage
                  src="/Heritage/image019.png"
                  alt="Global tea production chart"
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square hidden md:block">
                <ZoomableImage
                  src="/Heritage/image021.png"
                  alt="Tea trade mapping"
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square md:col-span-2 lg:col-span-1">
                <ZoomableImage
                  src="/Heritage/image023.png"
                  alt="Global tea consumption"
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </section>

          {/* Section: Tea by Category */}
          <section
            id="tea-cat"
            className="scroll-mt-40 bg-white rounded-2xl shadow-sm p-8 border border-emerald-50"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 inline-block rounded-full"></span>
              Tea by Category
            </h2>

            <div className="prose prose-emerald max-w-none text-gray-600">
              <p>
                As stated in Wikipedia,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Tea"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  tea
                </a>{" "}
                is generally divided into categories based on how it is
                processed during production. At least six different base types
                are produced:
              </p>

              <div className="my-10 relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 p-2 text-center aspect-video md:aspect-21/9">
                <Image
                  src="/Heritage/image025.png"
                  alt="Tea processing flow diagram"
                  fill
                  className="object-contain"
                />
              </div>

              {/* The 6 Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 px-2 lg:px-0">
                <div className="bg-white border-l-4 border-slate-200 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    White Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Withered, Dried
                    </span>
                    <em>Camellia sinensis</em> leaves and buds, made after being
                    picked and withered under the sun without baking or
                    steaming, very lightly rolling or not at all, then dried.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-yellow-300 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    Yellow Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Withered, Rolled, Enclosed/Smothered, Dried
                    </span>
                    Leaves go through the process of withering, rolling and
                    pressing, baking or steaming, with an added step of
                    enclosing for light fermentation, then dried.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-emerald-400 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    Green Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Withered, Rolled, Dried
                    </span>
                    Leaves go through the process of withering, rolling and
                    pressing, baking or steaming, and then drying, completely
                    without fermentation.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-teal-600 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    Oolong Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Withered, Bruised, Partially Oxidized, Baked
                    </span>
                    Leaves go through complicated processes including repeated
                    withering, green-making (bruising), baking, rolling and
                    pressing. The green-making gets the tea partially fermented
                    through controlled oxidation, and repeated fire baking
                    achieves distinct roasted flavors.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-red-700 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    Black Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Withered, Rolled, Fully Oxidized, Dried
                    </span>
                    Leaves go through the process of complete withering,
                    rolling, pressing, full oxidization/fermentation, then
                    finally dried. Gives it its distinct robust red/black color
                    and heavy flavor.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-neutral-800 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    Dark Tea
                  </h4>
                  <p className="text-sm">
                    <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider mb-2">
                      Process: Fermented, Shaped, Aged
                    </span>
                    Post-fermented tea by definition, where picked large tea
                    leaves are pressed into shape and dried after withering and
                    steaming. The pressed tea will then undergo a natural
                    process of gradual fermentation and maturation with time due
                    to microbes, much like fine wine.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-8 text-center text-emerald-900 border border-emerald-100 mt-10">
                <p className="mb-4">
                  Different teas attribute their characters from many factors:
                  tea species, environments of growth (their region of
                  production), tea harvest (season, time of day, manual or
                  mechanical, etc.), production processing such as rolling and
                  pressing, baking or steaming, fermentation, drying and
                  post-production storage (post-fermentation and aging, etc.).
                </p>
                <p className="mb-4">
                  The tea brewing (steeping) will demonstrate the charm and
                  benefit of the teas. The process to prepare and enjoy the tea
                  is the art of tea.
                </p>
                <p className="text-xl font-serif italic mt-6 font-semibold">
                  &quot;Tea comes from history, soaked with cultural and
                  spiritual heritage, it belongs to the common man same as it
                  belongs to the royal.&quot;
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
