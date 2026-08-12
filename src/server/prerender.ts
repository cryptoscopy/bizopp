import { INITIAL_ARTICLES } from '../data/articles';
import { INITIAL_OPPORTUNITIES } from '../data/opportunities';
import { INITIAL_MARKET_REPORTS } from '../data/marketReports';
import { MAIN_CATEGORIES } from '../data/categories';
import { AUTHORS } from '../data/authors';
import { CITY_CLUSTERS } from '../data/cityClusters';
import { INVESTMENT_TIERS } from '../data/investmentTiers';

const BASE_URL = 'https://bizopp.ai.studio';

export interface PrerenderResult {
  statusCode: number;
  html: string;
}

function escapeHtml(str: any): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  const lines = markdown.split('\n');
  const result: string[] = [];
  let inList = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        result.push('<ul class="list-disc pl-6 my-4">');
        inList = true;
      }
      let content = escapeHtml(line.slice(2));
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      result.push(`<li>${content}</li>`);
    } else if (line.startsWith('---')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push('<hr class="my-6 border-slate-200" />');
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      let content = escapeHtml(line);
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
      result.push(`<p class="mb-4 text-slate-700 leading-relaxed">${content}</p>`);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result.join('\n');
}

export function prerenderUrl(urlPath: string, templateHtml: string): PrerenderResult {
  // Normalize path
  let path = urlPath.split('?')[0].split('#')[0];
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  let statusCode = 200;
  let title = 'Business Opportunity Hub - Vetted Business Ideas & Market Research';
  let metaDescription = 'Research-backed business opportunities, 15-section market intelligence reports, machinery costing blueprints, and industrial cluster analysis.';
  let canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;
  let ogType = 'website';
  let ogImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80';
  let jsonLdScripts: object[] = [];
  let bodyContent = '';

  // Standard Header & Nav HTML for all prerendered pages
  const headerHtml = `
    <header class="bg-slate-900 text-white border-b border-slate-800 py-4 px-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-emerald-400">Business Opportunity Hub</a>
        <nav class="hidden md:flex space-x-6 text-sm font-medium">
          <a href="/articles/" class="hover:text-emerald-400">Articles</a>
          <a href="/business-ideas/" class="hover:text-emerald-400">Business Ideas</a>
          <a href="/market-research/" class="hover:text-emerald-400">Market Research</a>
          <a href="/authors/" class="hover:text-emerald-400">Analysts</a>
          <a href="/about/" class="hover:text-emerald-400">About</a>
          <a href="/contact/" class="hover:text-emerald-400">Contact</a>
        </nav>
      </div>
    </header>
  `;

  const footerHtml = `
    <footer class="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 mt-16 text-sm">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-white font-semibold mb-3">Business Opportunity Hub</h3>
          <p class="text-slate-400">Independent industrial market research, feasibility blueprints, and supply-chain analysis for SMEs.</p>
        </div>
        <div>
          <h4 class="text-white font-medium mb-2">Primary Categories</h4>
          <ul class="space-y-1">
            ${MAIN_CATEGORIES.map(c => `<li><a href="/category/${c.slug}" class="hover:text-emerald-400">${escapeHtml(c.name)}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-white font-medium mb-2">Industrial Hubs</h4>
          <ul class="space-y-1">
            ${CITY_CLUSTERS.slice(0, 5).map(c => `<li><a href="/city/${c.slug}" class="hover:text-emerald-400">${escapeHtml(c.name)} Industrial Cluster</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-white font-medium mb-2">Legal & Sitemap</h4>
          <ul class="space-y-1">
            <li><a href="/about/" class="hover:text-emerald-400">About Us</a></li>
            <li><a href="/editorial-policy/" class="hover:text-emerald-400">Editorial Policy</a></li>
            <li><a href="/privacy-policy/" class="hover:text-emerald-400">Privacy Policy</a></li>
            <li><a href="/terms/" class="hover:text-emerald-400">Terms of Service</a></li>
            <li><a href="/disclaimer/" class="hover:text-emerald-400">Disclaimer</a></li>
            <li><a href="/sitemap.xml" class="hover:text-emerald-400">XML Sitemap</a></li>
            <li><a href="/robots.txt" class="hover:text-emerald-400">Robots.txt</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
        &copy; ${new Date().getFullYear()} Business Opportunity Hub. All rights reserved.
      </div>
    </footer>
  `;

  // Route 1: Home Page
  if (path === '' || path === '/') {
    title = 'Business Opportunity Hub - Vetted Business Ideas, Feasibilities & Market Research';
    metaDescription = 'Discover high-yield manufacturing feasibility blueprints, 15-section market intelligence reports, machinery costing breakdown, and industrial cluster analysis for Pakistan and regional markets.';
    
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Business Opportunity Hub',
      'url': BASE_URL,
      'description': metaDescription,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${BASE_URL}/articles?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    bodyContent = `
      ${headerHtml}
      <main class="max-w-7xl mx-auto px-6 py-12">
        <section class="mb-12 text-center max-w-3xl mx-auto">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Vetted Industrial Opportunities & Feasibility Intelligence</h1>
          <p class="text-lg text-slate-600 mb-6">${escapeHtml(metaDescription)}</p>
          <div class="flex justify-center gap-4">
            <a href="/business-ideas/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700">Explore Feasibilities</a>
            <a href="/market-research/" class="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-900">Market Intelligence</a>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Featured Business Ideas & Feasibility Blueprints</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${INITIAL_OPPORTUNITIES.map(opp => `
              <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600">${escapeHtml(opp.category)}</span>
                <h3 class="text-xl font-bold text-slate-900 my-2">
                  <a href="/business-ideas/${opp.slug}" class="hover:text-emerald-600">${escapeHtml(opp.name)}</a>
                </h3>
                <p class="text-slate-600 text-sm mb-4 line-clamp-3">${escapeHtml(opp.description)}</p>
                <div class="text-xs font-medium text-slate-500 border-t border-slate-100 pt-3 flex justify-between">
                  <span>Margin: ${opp.expectedProfitMarginPercent}%</span>
                  <span>Payback: ${opp.paybackPeriodMonths} Months</span>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Latest Industrial Research Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${INITIAL_ARTICLES.map(art => `
              <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">${escapeHtml(art.category)}</span>
                  <h3 class="text-xl font-bold text-slate-900 my-2">
                    <a href="/articles/${art.slug}" class="hover:text-blue-600">${escapeHtml(art.title)}</a>
                  </h3>
                  <p class="text-slate-600 text-sm mb-4">${escapeHtml(art.excerpt)}</p>
                </div>
                <div class="text-xs text-slate-500 border-t border-slate-100 pt-3 flex justify-between">
                  <span>Published: ${art.publishedDate}</span>
                  <span>${art.readingTime}</span>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // Route 2: Article Detail (/articles/:slug)
  else if (path.startsWith('/articles/')) {
    const slug = path.replace('/articles/', '');
    const article = INITIAL_ARTICLES.find(a => a.slug === slug);

    if (!article) {
      statusCode = 404;
      title = 'Article Not Found - Business Opportunity Hub';
      metaDescription = 'The requested industrial article could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Article Not Found</h1>
          <p class="text-slate-600 mb-8">The requested article URL standard does not match any published content in our database.</p>
          <a href="/articles/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Browse All Articles</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = article.seoTitle || `${article.title} - Business Opportunity Hub`;
      metaDescription = article.metaDescription || article.excerpt;
      ogType = 'article';
      ogImage = article.featuredImage;

      const authorObj = AUTHORS.find(au => au.id === article.authorId) || AUTHORS[0];
      const categoryObj = MAIN_CATEGORIES.find(c => c.name === article.category) || MAIN_CATEGORIES[0];

      // Article Schema
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'description': article.excerpt,
        'image': article.featuredImage,
        'datePublished': article.publishedDate,
        'dateModified': article.updatedDate,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'author': {
          '@type': 'Person',
          'name': authorObj.name,
          'jobTitle': authorObj.title,
          'url': `${BASE_URL}/authors/${authorObj.slug}`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Business Opportunity Hub',
          'url': BASE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/icon.png`
          }
        },
        'articleSection': article.category,
        'keywords': article.tags ? article.tags.join(', ') : ''
      });

      // Breadcrumbs Schema
      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
          { '@type': 'ListItem', 'position': 2, 'name': 'Articles', 'item': `${BASE_URL}/articles/` },
          { '@type': 'ListItem', 'position': 3, 'name': article.category, 'item': `${BASE_URL}/category/${categoryObj.slug}` },
          { '@type': 'ListItem', 'position': 4, 'name': article.title, 'item': canonicalUrl }
        ]
      });

      // FAQ Schema
      if (article.faqs && article.faqs.length > 0) {
        jsonLdScripts.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': article.faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        });
      }

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <nav class="text-sm text-slate-500 mb-6 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href="/articles/" class="hover:underline">Articles</a>
            <span>/</span>
            <a href="/category/${categoryObj.slug}" class="hover:underline">${escapeHtml(article.category)}</a>
            <span>/</span>
            <span class="text-slate-800 font-medium truncate">${escapeHtml(article.title)}</span>
          </nav>

          <header class="mb-8">
            <span class="inline-block bg-emerald-100 text-emerald-800 font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              ${escapeHtml(article.category)}
            </span>
            <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">${escapeHtml(article.title)}</h1>
            <p class="text-xl text-slate-600 leading-relaxed mb-6">${escapeHtml(article.excerpt)}</p>
            
            <div class="flex items-center space-x-4 border-y border-slate-200 py-4 text-sm text-slate-600">
              <a href="/authors/${authorObj.slug}" class="font-bold text-slate-900 hover:text-emerald-600 flex items-center space-x-2">
                <span>By ${escapeHtml(authorObj.name)}</span>
              </a>
              <span>•</span>
              <span>Published: ${article.publishedDate}</span>
              <span>•</span>
              <span>Updated: ${article.updatedDate}</span>
              <span>•</span>
              <span>${article.readingTime}</span>
            </div>
          </header>

          <div class="my-8 rounded-2xl overflow-hidden border border-slate-200">
            <img src="${article.featuredImage}" alt="${escapeHtml(article.imageAlt)}" class="w-full h-auto object-cover max-h-[480px]" />
          </div>

          ${article.keyTakeaways && article.keyTakeaways.length > 0 ? `
            <section class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
              <h2 class="text-xl font-bold text-emerald-900 mb-3">Key Takeaways</h2>
              <ul class="space-y-2 text-emerald-950 text-sm">
                ${article.keyTakeaways.map(t => `<li class="flex items-start"><span class="mr-2 text-emerald-600">✓</span> <span>${escapeHtml(t)}</span></li>`).join('')}
              </ul>
            </section>
          ` : ''}

          <article class="prose prose-slate max-w-none mb-12">
            ${markdownToHtml(article.content)}
          </article>

          ${article.sources && article.sources.length > 0 ? `
            <section class="border-t border-slate-200 pt-8 my-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Sources & Industry Data References</h2>
              <ul class="space-y-2 text-sm text-slate-600">
                ${article.sources.map(s => `
                  <li class="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <strong class="text-slate-900">${escapeHtml(s.title)}</strong> 
                    ${s.publisher ? `<span class="text-slate-500">(${escapeHtml(s.publisher)}${s.year ? `, ${s.year}` : ''})</span>` : ''}
                    ${s.note ? `<p class="text-xs text-slate-500 mt-1">${escapeHtml(s.note)}</p>` : ''}
                  </li>
                `).join('')}
              </ul>
            </section>
          ` : ''}

          ${article.faqs && article.faqs.length > 0 ? `
            <section class="bg-slate-50 border border-slate-200 rounded-2xl p-8 my-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div class="space-y-6">
                ${article.faqs.map(faq => `
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">${escapeHtml(faq.question)}</h3>
                    <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(faq.answer)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <section class="border-t border-slate-200 pt-8 mt-12">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Related Industrial Feasibility Blueprints</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${INITIAL_OPPORTUNITIES.slice(0, 2).map(opp => `
                <div class="border border-slate-200 p-5 rounded-xl hover:border-emerald-500 transition">
                  <span class="text-xs font-semibold text-emerald-600 uppercase">${escapeHtml(opp.category)}</span>
                  <h3 class="text-lg font-bold text-slate-900 my-1">
                    <a href="/business-ideas/${opp.slug}" class="hover:text-emerald-600">${escapeHtml(opp.name)}</a>
                  </h3>
                  <p class="text-xs text-slate-600 line-clamp-2">${escapeHtml(opp.description)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 3: Business Ideas Index & Detail (/business-ideas & /business-ideas/:slug)
  else if (path === '/business-ideas' || path === '/business-ideas/') {
    title = 'Vetted Business Ideas & Feasibility Studies in Pakistan - Business Opportunity Hub';
    metaDescription = 'Explore vetted small-scale manufacturing, assembly, and trading business ideas with exact PKR capital requirements, machinery lists, and profit payback periods.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-7xl mx-auto px-6 py-10">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-4">Feasibility Blueprints & Business Ideas</h1>
        <p class="text-slate-600 mb-8 max-w-3xl">${escapeHtml(metaDescription)}</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${INITIAL_OPPORTUNITIES.map(opp => `
            <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span class="text-xs font-semibold uppercase text-emerald-600">${escapeHtml(opp.category)}</span>
              <h2 class="text-xl font-bold text-slate-900 my-2">
                <a href="/business-ideas/${opp.slug}" class="hover:text-emerald-600">${escapeHtml(opp.name)}</a>
              </h2>
              <p class="text-slate-600 text-sm mb-4 line-clamp-3">${escapeHtml(opp.description)}</p>
              <div class="text-xs text-slate-500 border-t border-slate-100 pt-3 flex justify-between">
                <span>Profit Margin: ${opp.expectedProfitMarginPercent}%</span>
                <span>Payback: ${opp.paybackPeriodMonths} Months</span>
              </div>
            </article>
          `).join('')}
        </div>
      </main>
      ${footerHtml}
    `;
  }
  else if (path.startsWith('/business-ideas/')) {
    const slug = path.replace('/business-ideas/', '');
    const opportunity = INITIAL_OPPORTUNITIES.find(o => o.slug === slug);

    if (!opportunity) {
      statusCode = 404;
      title = 'Business Idea Not Found - Business Opportunity Hub';
      metaDescription = 'The requested business opportunity feasibility study could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Business Idea Not Found</h1>
          <p class="text-slate-600 mb-8">The requested business opportunity URL does not exist in our index.</p>
          <a href="/business-ideas/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">View All Business Ideas</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${opportunity.name} - Feasibility Study, Machinery Cost & Profit Margin`;
      metaDescription = opportunity.description;

      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        'name': opportunity.name,
        'description': opportunity.description,
        'url': canonicalUrl
      });

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <nav class="text-sm text-slate-500 mb-6 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href="/business-ideas/" class="hover:underline">Business Ideas</a>
            <span>/</span>
            <span class="text-slate-800 font-medium truncate">${escapeHtml(opportunity.name)}</span>
          </nav>

          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4">${escapeHtml(opportunity.name)}</h1>
          <p class="text-xl text-slate-600 mb-8 leading-relaxed">${escapeHtml(opportunity.description)}</p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
            <div>
              <span class="text-xs text-slate-500 block uppercase">Min Capital (PKR)</span>
              <strong class="text-xl font-bold text-slate-900">${(opportunity.minCapitalPKR / 100000).toFixed(1)} Lakh</strong>
            </div>
            <div>
              <span class="text-xs text-slate-500 block uppercase">Profit Margin</span>
              <strong class="text-xl font-bold text-emerald-600">${opportunity.expectedProfitMarginPercent}%</strong>
            </div>
            <div>
              <span class="text-xs text-slate-500 block uppercase">Payback Period</span>
              <strong class="text-xl font-bold text-slate-900">${opportunity.paybackPeriodMonths} Months</strong>
            </div>
            <div>
              <span class="text-xs text-slate-500 block uppercase">Category</span>
              <strong class="text-xl font-bold text-slate-900">${escapeHtml(opportunity.category)}</strong>
            </div>
          </div>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Required Machinery & Equipment</h2>
            <ul class="space-y-3">
              ${(opportunity.equipmentNeeded || []).map(eq => `
                <li class="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <strong class="text-slate-900 block">${escapeHtml(eq.item)}</strong>
                    <span class="text-xs text-slate-500">Source: ${escapeHtml(eq.source)}</span>
                  </div>
                  <span class="font-semibold text-slate-900 text-sm">PKR ${(eq.approxCostPKR / 100000).toFixed(2)} Lakh</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Step-by-Step Implementation Strategy</h2>
            <ol class="space-y-4">
              ${(opportunity.executionSteps || []).map(st => `
                <li class="bg-white border border-slate-200 p-5 rounded-xl">
                  <strong class="text-emerald-600 block text-sm">Step ${st.stepNumber}: ${escapeHtml(st.title)}</strong>
                  <p class="text-slate-700 text-sm mt-1">${escapeHtml(st.detail)}</p>
                </li>
              `).join('')}
            </ol>
          </section>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 4: Market Research Index & Detail (/market-research & /market-research/:slug)
  else if (path === '/market-research' || path === '/market-research/') {
    title = 'Industrial Market Research Reports Pakistan - Business Opportunity Hub';
    metaDescription = 'Deep-dive 15-section market intelligence reports covering industrial equipment, raw material supply chains, export demand, and local tariffs.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-7xl mx-auto px-6 py-10">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-4">Market Intelligence & Industry Reports</h1>
        <p class="text-slate-600 mb-8 max-w-3xl">${escapeHtml(metaDescription)}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${INITIAL_MARKET_REPORTS.map(rep => `
            <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span class="text-xs font-semibold uppercase text-blue-600">${escapeHtml(rep.category)}</span>
              <h2 class="text-xl font-bold text-slate-900 my-2">
                <a href="/market-research/${rep.slug}" class="hover:text-blue-600">${escapeHtml(rep.title)}</a>
              </h2>
              <p class="text-slate-600 text-sm mb-4">${escapeHtml(rep.executiveSummary)}</p>
              <div class="text-xs text-slate-500 border-t border-slate-100 pt-3">
                Updated: ${rep.lastUpdated}
              </div>
            </article>
          `).join('')}
        </div>
      </main>
      ${footerHtml}
    `;
  }
  else if (path.startsWith('/market-research/')) {
    const slug = path.replace('/market-research/', '');
    const report = INITIAL_MARKET_REPORTS.find(r => r.slug === slug);

    if (!report) {
      statusCode = 404;
      title = 'Market Report Not Found - Business Opportunity Hub';
      metaDescription = 'The requested market intelligence report could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Report Not Found</h1>
          <p class="text-slate-600 mb-8">The requested market report URL does not exist in our database.</p>
          <a href="/market-research/" class="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold">View All Market Reports</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${report.title} - Market Research & Industry Analysis`;
      metaDescription = report.executiveSummary;

      jsonLdScripts.push({
        '@context': 'https://schema.org',
        '@type': 'Report',
        'name': report.title,
        'description': report.executiveSummary,
        'url': canonicalUrl
      });

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <nav class="text-sm text-slate-500 mb-6 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href="/market-research/" class="hover:underline">Market Research</a>
            <span>/</span>
            <span class="text-slate-800 font-medium truncate">${escapeHtml(report.title)}</span>
          </nav>

          <span class="inline-block bg-blue-100 text-blue-800 font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            ${escapeHtml(report.category)}
          </span>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4">${escapeHtml(report.title)}</h1>
          <p class="text-xl text-slate-600 mb-8 leading-relaxed">${escapeHtml(report.executiveSummary)}</p>

          <div class="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
            <h2 class="text-lg font-bold text-slate-900 mb-2">Market Valuation & Demand Analysis</h2>
            <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(report.demandAnalysis)}</p>
          </div>

          <article class="prose prose-slate max-w-none mb-12">
            ${markdownToHtml(report.supplyChain)}
          </article>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 5: Articles Index (/articles)
  else if (path === '/articles' || path === '/articles/') {
    title = 'Industrial Research Articles & Guides - Business Opportunity Hub';
    metaDescription = 'Read operational guides on factory setup, machinery procurement, FBR tax compliance, and DISCO power approvals in Pakistan.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-7xl mx-auto px-6 py-10">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-4">Industrial Research Articles</h1>
        <p class="text-slate-600 mb-8 max-w-3xl">${escapeHtml(metaDescription)}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${INITIAL_ARTICLES.map(art => `
            <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span class="text-xs font-semibold uppercase text-blue-600">${escapeHtml(art.category)}</span>
              <h2 class="text-xl font-bold text-slate-900 my-2">
                <a href="/articles/${art.slug}" class="hover:text-blue-600">${escapeHtml(art.title)}</a>
              </h2>
              <p class="text-slate-600 text-sm mb-4">${escapeHtml(art.excerpt)}</p>
              <div class="text-xs text-slate-500 border-t border-slate-100 pt-3 flex justify-between">
                <span>Published: ${art.publishedDate}</span>
                <span>${art.readingTime}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </main>
      ${footerHtml}
    `;
  }

  // Route 6: Authors / Analysts Index & Detail (/authors & /authors/:slug)
  else if (path === '/authors' || path === '/authors/') {
    title = 'Senior Industrial Analysts & Research Team - Business Opportunity Hub';
    metaDescription = 'Meet our team of senior industrial research analysts specializing in engineering costing, machinery sourcing, and market feasibility studies.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-7xl mx-auto px-6 py-10">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-4">Industrial Research Team</h1>
        <p class="text-slate-600 mb-8 max-w-3xl">${escapeHtml(metaDescription)}</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${AUTHORS.map(au => `
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
              <img src="${au.avatar}" alt="${escapeHtml(au.name)}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h2 class="text-xl font-bold text-slate-900">
                <a href="/authors/${au.slug}" class="hover:text-emerald-600">${escapeHtml(au.name)}</a>
              </h2>
              <p class="text-xs text-emerald-600 font-semibold mb-3">${escapeHtml(au.title)}</p>
              <p class="text-slate-600 text-xs line-clamp-3 mb-4">${escapeHtml(au.bio)}</p>
            </div>
          `).join('')}
        </div>
      </main>
      ${footerHtml}
    `;
  }
  else if (path.startsWith('/authors/')) {
    const slug = path.replace('/authors/', '');
    const author = AUTHORS.find(a => a.slug === slug);

    if (!author) {
      statusCode = 404;
      title = 'Author Not Found - Business Opportunity Hub';
      metaDescription = 'The requested author profile could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Analyst Profile Not Found</h1>
          <a href="/authors/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">View All Analysts</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${author.name} - ${author.title} | Business Opportunity Hub`;
      metaDescription = author.bio;

      const authorArticles = INITIAL_ARTICLES.filter(a => a.authorId === author.id);

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <div class="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 mb-10">
            <img src="${author.avatar}" alt="${escapeHtml(author.name)}" class="w-32 h-32 rounded-full object-cover border-2 border-emerald-500" />
            <div>
              <h1 class="text-3xl font-extrabold text-slate-900">${escapeHtml(author.name)}</h1>
              <p class="text-emerald-600 font-semibold text-sm mb-2">${escapeHtml(author.title)}</p>
              <p class="text-slate-700 text-sm leading-relaxed mb-4">${escapeHtml(author.bio)}</p>
              <div class="flex flex-wrap gap-2">
                ${(author.expertise || []).map(e => `<span class="bg-white border border-slate-200 text-xs px-3 py-1 rounded-full text-slate-700 font-medium">${escapeHtml(e)}</span>`).join('')}
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-slate-900 mb-6">Published Research by ${escapeHtml(author.name)}</h2>
          <div class="space-y-4">
            ${authorArticles.map(art => `
              <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-emerald-500 transition">
                <span class="text-xs font-semibold text-emerald-600 uppercase">${escapeHtml(art.category)}</span>
                <h3 class="text-lg font-bold text-slate-900 my-1">
                  <a href="/articles/${art.slug}" class="hover:text-emerald-600">${escapeHtml(art.title)}</a>
                </h3>
                <p class="text-xs text-slate-600">${escapeHtml(art.excerpt)}</p>
              </div>
            `).join('')}
          </div>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 7: Category Pages (/category/:slug)
  else if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '');
    const category = MAIN_CATEGORIES.find(c => c.slug === slug);

    if (!category) {
      statusCode = 404;
      title = 'Category Not Found - Business Opportunity Hub';
      metaDescription = 'The requested content category could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Category Not Found</h1>
          <a href="/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Return Home</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${category.name} Business Opportunities & Research - Business Opportunity Hub`;
      metaDescription = category.description;

      const catArticles = INITIAL_ARTICLES.filter(a => a.category.toLowerCase() === category.name.toLowerCase());
      const catOpps = INITIAL_OPPORTUNITIES.filter(o => o.category.toLowerCase() === category.name.toLowerCase());

      bodyContent = `
        ${headerHtml}
        <main class="max-w-7xl mx-auto px-6 py-10">
          <h1 class="text-3xl font-extrabold text-slate-900 mb-2">${escapeHtml(category.name)}</h1>
          <p class="text-slate-600 mb-8 max-w-3xl">${escapeHtml(category.description)}</p>

          ${catOpps.length > 0 ? `
            <section class="mb-10">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Feasibility Blueprints in ${escapeHtml(category.name)}</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${catOpps.map(opp => `
                  <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-xl font-bold text-slate-900 mb-2">
                      <a href="/business-ideas/${opp.slug}" class="hover:text-emerald-600">${escapeHtml(opp.name)}</a>
                    </h3>
                    <p class="text-slate-600 text-sm mb-4 line-clamp-3">${escapeHtml(opp.description)}</p>
                  </article>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <section>
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Articles & Guides in ${escapeHtml(category.name)}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${catArticles.map(art => `
                <article class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 class="text-xl font-bold text-slate-900 mb-2">
                    <a href="/articles/${art.slug}" class="hover:text-blue-600">${escapeHtml(art.title)}</a>
                  </h3>
                  <p class="text-slate-600 text-sm">${escapeHtml(art.excerpt)}</p>
                </article>
              `).join('')}
            </div>
          </section>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 8: City Cluster Pages (/city/:slug)
  else if (path.startsWith('/city/')) {
    const slug = path.replace('/city/', '');
    const city = CITY_CLUSTERS.find(c => c.slug === slug);

    if (!city) {
      statusCode = 404;
      title = 'Industrial City Hub Not Found - Business Opportunity Hub';
      metaDescription = 'The requested industrial city cluster page could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Industrial Hub Not Found</h1>
          <a href="/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Return Home</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${city.seoTitle || city.name + ' Industrial Cluster'} - Business Opportunity Hub`;
      metaDescription = city.metaDescription || city.description;

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <span class="text-xs font-semibold uppercase text-emerald-600 tracking-wider">${escapeHtml(city.province)} Industrial Cluster</span>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 my-2">${escapeHtml(city.name)} Industrial Hub</h1>
          <p class="text-xl text-slate-600 mb-8 leading-relaxed">${escapeHtml(city.description)}</p>

          <div class="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
            <h2 class="text-lg font-bold text-slate-900 mb-3">Key Manufacturing Specializations</h2>
            <div class="flex flex-wrap gap-2">
              ${(city.primaryIndustries || []).map(s => `<span class="bg-white border border-slate-200 text-sm font-medium text-slate-800 px-3 py-1 rounded-full">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 9: Investment Tier Pages (/investment/:slug)
  else if (path.startsWith('/investment/')) {
    const slug = path.replace('/investment/', '');
    const tier = INVESTMENT_TIERS.find(t => t.slug === slug);

    if (!tier) {
      statusCode = 404;
      title = 'Investment Tier Not Found - Business Opportunity Hub';
      metaDescription = 'The requested investment capital range page could not be found.';
      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">404 - Capital Tier Not Found</h1>
          <a href="/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Return Home</a>
        </main>
        ${footerHtml}
      `;
    } else {
      title = `${tier.pkLabel || tier.title} - Business Opportunity Hub`;
      metaDescription = tier.metaDescription || tier.summary;

      bodyContent = `
        ${headerHtml}
        <main class="max-w-4xl mx-auto px-6 py-10">
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4">${escapeHtml(tier.pkLabel || tier.title)}</h1>
          <p class="text-xl text-slate-600 mb-8">${escapeHtml(tier.summary)}</p>
        </main>
        ${footerHtml}
      `;
    }
  }

  // Route 10: Static Trust & About Pages (/about, /contact, /editorial-policy, /privacy-policy, /terms, /disclaimer)
  else if (path === '/about' || path === '/about/') {
    title = 'About Business Opportunity Hub - SME Feasibility & Market Intelligence';
    metaDescription = 'Learn about Business Opportunity Hub, an independent research initiative providing verified feasibility blueprints, machinery costing, and market analysis for SMEs in Pakistan.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">About Business Opportunity Hub</h1>
        <p class="text-slate-700 text-lg leading-relaxed mb-6">${escapeHtml(metaDescription)}</p>
        <p class="text-slate-700 text-base leading-relaxed">Our mission is to eliminate market information asymmetry for first-time entrepreneurs and industrial investors across Pakistan. We publish vetted feasibility reports, step-by-step regulatory compliance workflows, and equipment sourcing guides based on field visits and interviews with local cluster manufacturers in Gujranwala, Sialkot, Faisalabad, Karachi, and Lahore.</p>
      </main>
      ${footerHtml}
    `;
  }
  else if (path === '/contact' || path === '/contact/') {
    title = 'Contact Industrial Research Analysts - Business Opportunity Hub';
    metaDescription = 'Get in touch with our team of senior industrial research analysts for customized feasibility inquiries, editorial corrections, or machinery sourcing guidance.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">Contact Our Analysts</h1>
        <p class="text-slate-700 text-lg leading-relaxed mb-6">Have questions regarding a feasibility study, custom market report, or cluster analysis? Reach out to our research desk.</p>
        <div class="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <p class="text-sm text-slate-800"><strong>Email:</strong> research@businessopportunityhub.com</p>
          <p class="text-sm text-slate-800 mt-2"><strong>Location:</strong> Industrial Research Wing, Lahore & Gujranwala, Pakistan</p>
        </div>
      </main>
      ${footerHtml}
    `;
  }
  else if (path === '/editorial-policy' || path === '/editorial-policy/') {
    title = 'Editorial Policy & Research Standards - Business Opportunity Hub';
    metaDescription = 'Our editorial policy details our research methodology, source verification standards, data collection ethics, and independence guarantees.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">Editorial Policy & Research Standards</h1>
        <p class="text-slate-700 text-base leading-relaxed mb-4">Every feasibility blueprint and market report published on Business Opportunity Hub undergoes a strict 3-stage peer review process:</p>
        <ol class="list-decimal pl-6 space-y-2 text-slate-700 text-sm">
          <li><strong>Primary Field Research:</strong> Verifying local machinery dealer quotes, electricity tariff tiers, and raw material wholesale rates.</li>
          <li><strong>Quantitative Financial Modelling:</strong> Calculating realistic payback periods based on 60% operational capacity to account for load-shedding and seasonal volatility.</li>
          <li><strong>Legal & Regulatory Audit:</strong> Checking FBR tax rates, DISCO power sanction procedures, and environmental compliance requirements.</li>
        </ol>
      </main>
      ${footerHtml}
    `;
  }
  else if (path === '/privacy-policy' || path === '/privacy-policy/') {
    title = 'Privacy Policy - Business Opportunity Hub';
    metaDescription = 'Privacy policy for Business Opportunity Hub detailing data usage, analytics, and cookie handling.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
        <p class="text-slate-700 text-sm leading-relaxed">Your privacy is important to us. This privacy policy outlines how we handle user data and visitor analytics on Business Opportunity Hub.</p>
      </main>
      ${footerHtml}
    `;
  }
  else if (path === '/terms' || path === '/terms/') {
    title = 'Terms of Service - Business Opportunity Hub';
    metaDescription = 'Terms of service and usage conditions for Business Opportunity Hub.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
        <p class="text-slate-700 text-sm leading-relaxed">By accessing and using Business Opportunity Hub, you agree to these terms of service.</p>
      </main>
      ${footerHtml}
    `;
  }
  else if (path === '/disclaimer' || path === '/disclaimer/') {
    title = 'Financial & Business Disclaimer - Business Opportunity Hub';
    metaDescription = 'Financial and legal disclaimer regarding feasibility models and estimated profit calculations.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">Financial & Business Feasibility Disclaimer</h1>
        <p class="text-slate-700 text-sm leading-relaxed">All financial estimates, machinery pricing, profit margins, and payback periods published on Business Opportunity Hub are provided for informational and educational purposes only. Market conditions, currency exchange rates, raw material costs, and regulatory tariffs fluctuate. Independent feasibility audits by qualified chartered accountants and technical engineers are recommended before committing capital.</p>
      </main>
      ${footerHtml}
    `;
  }

  // Default Catch-All: 404 Not Found Page
  else {
    statusCode = 404;
    title = '404 Page Not Found - Business Opportunity Hub';
    metaDescription = 'The requested page URL could not be found on Business Opportunity Hub.';
    bodyContent = `
      ${headerHtml}
      <main class="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 class="text-5xl font-black text-slate-900 mb-4">404</h1>
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p class="text-slate-600 mb-8">The requested path <code class="bg-slate-100 text-slate-800 px-2 py-1 rounded">${escapeHtml(urlPath)}</code> does not exist on our server.</p>
        <a href="/" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Return to Homepage</a>
      </main>
      ${footerHtml}
    `;
  }

  // Construct JSON-LD script tags
  const jsonLdHtml = jsonLdScripts.length > 0
    ? jsonLdScripts.map(sd => `<script type="application/ld+json">${JSON.stringify(sd)}</script>`).join('\n    ')
    : '';

  // Inject into templateHtml
  let renderedHtml = templateHtml;

  // Replace Title
  renderedHtml = renderedHtml.replace(
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(title)}</title>`
  );

  // Replace Meta Description
  if (renderedHtml.includes('<meta name="description"')) {
    renderedHtml = renderedHtml.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${escapeHtml(metaDescription)}" />`
    );
  } else {
    renderedHtml = renderedHtml.replace(
      '</head>',
      `  <meta name="description" content="${escapeHtml(metaDescription)}" />\n</head>`
    );
  }

  // Replace Canonical Link
  if (renderedHtml.includes('<link rel="canonical"')) {
    renderedHtml = renderedHtml.replace(
      /<link rel="canonical" href=".*?" \/>/s,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
  } else {
    renderedHtml = renderedHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n</head>`
    );
  }

  // Replace OG Meta
  if (renderedHtml.includes('<meta property="og:title"')) {
    renderedHtml = renderedHtml.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapeHtml(title)}" />`);
    renderedHtml = renderedHtml.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapeHtml(metaDescription)}" />`);
    renderedHtml = renderedHtml.replace(/<meta property="og:type" content=".*?" \/>/s, `<meta property="og:type" content="${ogType}" />`);
    renderedHtml = renderedHtml.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
    renderedHtml = renderedHtml.replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${escapeHtml(ogImage)}" />`);
  } else {
    const headExtra = `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(metaDescription)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
  `;
    renderedHtml = renderedHtml.replace('</head>', `${headExtra}\n</head>`);
  }

  // Inject JSON-LD Scripts before </head>
  if (jsonLdHtml) {
    renderedHtml = renderedHtml.replace('</head>', `  ${jsonLdHtml}\n</head>`);
  }

  // Inject Prerendered HTML Body inside <div id="root"></div>
  renderedHtml = renderedHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyContent}</div>`
  );

  return {
    statusCode,
    html: renderedHtml,
  };
}
