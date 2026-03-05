import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Newspaper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Monsoon Planting Tips for Bhutanese Farmers',
    date: '2026-02-15',
    excerpt: 'The monsoon season brings both opportunity and challenge. Learn how to maximize your yield during the rainy season with these expert tips from our agronomists.',
    content: `The monsoon season in Bhutan typically runs from June to September, bringing heavy rainfall that can be both a blessing and a challenge for farmers. Here are key strategies to maximize your harvest:\n\n**Soil Preparation:** Before the monsoon arrives, ensure your fields have proper drainage channels. Waterlogged soil can damage root systems and promote fungal diseases.\n\n**Crop Selection:** Choose monsoon-resilient varieties. Rice, maize, and certain leafy vegetables thrive during this period. Our academy recommends the BL-4 rice variety for its high yield and disease resistance.\n\n**Pest Management:** Increased humidity creates ideal conditions for pests. Implement integrated pest management (IPM) strategies — use neem-based sprays and encourage natural predators.\n\n**Hydroponic Advantage:** For those with hydroponic setups, the monsoon is an excellent time to expand production since temperature and humidity are naturally regulated.\n\nContact our extension officers at +975 77421966 for personalized guidance.`,
    category: 'Seasonal Tips',
  },
  {
    id: 2,
    title: 'Winter Crop Protection Strategies',
    date: '2026-01-20',
    excerpt: 'Cold temperatures and frost can devastate crops. Discover proven techniques to protect your winter harvest and maintain productivity through the cold months.',
    content: `Winter in Bhutan's higher altitudes can be harsh, with temperatures dropping below freezing. Protecting your crops requires proactive planning:\n\n**Row Covers & Tunnels:** Low-cost plastic tunnels can raise temperatures by 5-10°C, protecting sensitive crops like tomatoes, peppers, and herbs.\n\n**Mulching:** Apply a thick layer of organic mulch (straw, dried leaves) around plant bases to insulate roots from frost damage.\n\n**Cold-Hardy Varieties:** Focus on crops that thrive in cold: spinach, kale, radishes, turnips, and garlic. These can often be harvested even after light frosts.\n\n**Greenhouse Production:** Our academy's hydroponic greenhouse operates year-round, demonstrating that winter need not mean zero production. Enroll in our winter farming module to learn more.\n\n**Water Management:** Water your crops in the morning so plants are hydrated before cold nights. Avoid evening watering which can freeze around roots.`,
    category: 'Winter Farming',
  },
  {
    id: 3,
    title: 'Spring Fertilization Guide for Maximum Yield',
    date: '2026-03-01',
    excerpt: 'Spring is the most critical time for soil nutrition. Our experts share a comprehensive fertilization schedule to give your crops the best possible start.',
    content: `Spring marks the beginning of the main growing season. Getting your fertilization right now sets the foundation for the entire year's harvest:\n\n**Soil Testing First:** Before applying any fertilizer, test your soil pH and nutrient levels. Our academy offers free soil testing for enrolled farmers. Contact us at +975 77421966.\n\n**Organic Matter:** Incorporate well-composted manure or compost into your soil 2-3 weeks before planting. Aim for 20-30% organic matter content.\n\n**NPK Balance:** For most vegetable crops, a balanced NPK ratio of 10-10-10 works well at planting. Adjust nitrogen upward for leafy greens, phosphorus for root crops.\n\n**Micronutrients:** Bhutan's soils are often deficient in zinc and boron. A micronutrient foliar spray at early growth stages can significantly boost yields.\n\n**Organic Options:** Vermicompost, bone meal, and wood ash are excellent organic alternatives that improve soil structure while providing nutrients.\n\n**Timing:** Apply base fertilizer 1 week before planting, then side-dress with nitrogen 3-4 weeks after emergence.`,
    category: 'Soil Health',
  },
  {
    id: 4,
    title: 'Gelephu Academy Launches New Hydroponic Training Batch',
    date: '2026-02-28',
    excerpt: 'We are excited to announce the opening of applications for our next hydroponic farming training batch, starting April 2026. Limited seats available.',
    content: `The Gelephu Farmers Academy is proud to announce the opening of applications for our April 2026 Hydroponic Farming Training Program.\n\n**Program Highlights:**\n- 3-month intensive hands-on training\n- Learn NFT, DWC, and vertical farming systems\n- Earn while you learn through production work\n- Certificate recognized by the Ministry of Agriculture\n\n**Eligibility:**\n- Bhutanese citizens aged 18-45\n- Basic literacy in English or Dzongkha\n- Genuine interest in modern farming\n\n**How to Apply:**\nVisit our Contact page or call +975 77421966 to register your interest. Applications close March 31, 2026.\n\n**Scholarship Available:** 50% of seats are subsidized for farmers from rural dzongkhags.`,
    category: 'Academy News',
  },
  {
    id: 5,
    title: 'Success Story: Farmer Doubles Income with Drip Irrigation',
    date: '2026-01-10',
    excerpt: 'Tshering Dorji from Sarpang doubled his vegetable income within one season after completing our drip irrigation training. Read his inspiring journey.',
    content: `Tshering Dorji, a 34-year-old farmer from Sarpang Dzongkhag, enrolled in the Gelephu Farmers Academy's drip irrigation module in September 2025. Six months later, his story is one of remarkable transformation.\n\n**Before Training:** Tshering was growing vegetables on 0.5 acres using traditional flood irrigation, earning approximately Nu. 45,000 per season.\n\n**The Change:** After completing the 2-week drip irrigation installation and management course, Tshering installed a simple drip system using locally available materials. He also learned about fertigation — delivering nutrients directly through the irrigation system.\n\n**The Results:**\n- Water usage reduced by 60%\n- Crop yield increased by 85%\n- Seasonal income: Nu. 92,000 — more than double\n- Time spent on irrigation reduced from 4 hours to 30 minutes daily\n\n"The academy changed my life," says Tshering. "I now have time to expand to a second plot and teach my neighbors."\n\nInspired by Tshering's story? Call us at +975 77421966 to enroll in our next training batch.`,
    category: 'Success Stories',
  },
];

const categoryColors: Record<string, string> = {
  'Seasonal Tips': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Winter Farming': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Soil Health': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'Academy News': 'bg-primary/10 text-primary',
  'Success Stories': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

export default function NewsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Newspaper className="w-12 h-12 opacity-80" />
          </div>
          <h1 className="text-4xl font-bold mb-3">News & Blog</h1>
          <p className="text-lg opacity-90">
            Seasonal farming tips, academy updates, and success stories from Gelephu Farmers Academy
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            return (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-muted text-muted-foreground'}`}>
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <CardTitle className="text-xl leading-snug">{article.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="prose prose-sm max-w-none text-foreground">
                        {article.content.split('\n\n').map((para, i) => (
                          <p key={i} className="mb-3 leading-relaxed text-sm">
                            {para.split('\n').map((line, j) => (
                              <span key={j}>
                                {line.startsWith('**') && line.endsWith('**')
                                  ? <strong>{line.slice(2, -2)}</strong>
                                  : line}
                                {j < para.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="mt-2 text-primary hover:text-primary/80 p-0 h-auto font-medium"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-4 h-4 mr-1" /> Show Less</>
                    ) : (
                      <><ChevronDown className="w-4 h-4 mr-1" /> Read More</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
