# Project: Multilingual Landing Page for a Drone Inspection Company in Szczecin

## Goal

Build a professional, modern, dynamic, and conversion-focused landing page for a company that provides drone-based inspection and aerial data services in Szczecin, Poland.

The website should:
- look premium and trustworthy
- feel dynamic and modern
- be optimized for SEO from the start
- support 3 languages from day one: Polish, English, and German
- include a contact form at the bottom of the page
- use a drone video background in the hero section
- use drone photos and service-related visuals from the project assets
- be built in React, preferably with Next.js for SEO and performance

---

## Required Languages

The website must be fully available in:
- Polish (`pl`)
- English (`en`)
- German (`de`)

All visible UI text, headings, buttons, labels, meta tags, SEO titles, SEO descriptions, image alt texts, structured data content, and service descriptions must be translated into all 3 languages.

Do not hardcode user-facing text directly in components.
Use translation files for all content.

Recommended i18n structure:

- `/locales/pl/translation.json`
- `/locales/en/translation.json`
- `/locales/de/translation.json`

Recommended implementation:
- `react-i18next` for React, or
- built-in i18n routing if using Next.js App Router

Language switcher must be visible in the top navigation.

The selected language should persist across navigation using:
- route locale, and/or
- localStorage, and/or
- browser language detection

---

## SEO Requirements

The website must be strongly optimized for SEO and local SEO in Szczecin.

SEO priorities:
- semantic HTML
- proper heading hierarchy (`h1`, `h2`, `h3`)
- optimized metadata for each language version
- location-based SEO for Szczecin / Stettin
- keyword-rich but natural copy
- optimized image alt text
- internal linking between sections if useful
- fast loading performance
- responsive layout
- accessible markup
- structured data in JSON-LD

Each language version should have its own:
- title tag
- meta description
- Open Graph tags
- canonical / hreflang setup
- localized headings and service descriptions

Implement `hreflang` correctly for:
- `pl-PL`
- `en`
- `de-DE`

If using Next.js, build localized metadata per locale.

---

## SEO Keywords

The website must target the following keywords naturally in headings, body copy, metadata, alt texts, and supporting content.

### Polish keywords
- dron Szczecin
- inspekcja dronem Szczecin
- inspekcje dronem Szczecin
- fotogrametria dronem Szczecin
- modele 3D z drona
- szacowanie szkód łowieckich
- termowizja dronem
- inspekcje wizualne turbin wiatrowych

### English keywords
- drone Szczecin
- drone inspection Szczecin
- drone inspections Szczecin
- drone photogrammetry Szczecin
- 3D models from drone data
- wildlife damage estimation
- thermal imaging drone inspection
- visual inspection of wind turbines

### German keywords
- Drohne Szczecin
- Drohneninspektion Szczecin
- Drohneninspektion Stettin
- Drohneninspektionen Szczecin
- Drohnenfotogrammetrie Szczecin
- 3D-Modelle aus Drohnendaten
- Wildschadenbewertung
- Thermografie mit Drohne
- visuelle Inspektion von Windkraftanlagen

Do not overstuff keywords.
Copy should read naturally and professionally.

---

## Target Audience

The website should appeal to:
- industrial clients
- construction companies
- infrastructure owners
- wind energy sector
- agriculture and land owners
- insurance / damage assessment related clients
- property owners needing roof or facade inspections

The content should communicate professionalism, precision, safety, modern technology, and reliable reporting.

---

## Technical Stack

Preferred stack:
- Next.js
- React
- Tailwind CSS

Recommended additions:
- Framer Motion for subtle animations
- React Hook Form for contact form
- react-i18next if not using native Next.js i18n
- optimized image and video handling
- server action or API endpoint for form submission

If choosing between plain React and Next.js, prefer Next.js because SEO is important.

---

## Visual Style

The website should look:
- professional
- premium
- modern
- dynamic
- technological
- clean and trustworthy

Use:
- full-width sections
- large strong typography
- subtle motion and transitions
- strong visual hierarchy
- clean spacing
- modern cards and section layouts
- dark overlay over hero video for readability
- clear call-to-action buttons

Suggested visual direction:
- premium industrial-tech style
- high contrast
- neutral dark base with strong accent color
- polished hover states
- smooth scrolling

The design should feel suitable for a serious B2B service company, not like a hobby drone portfolio.

---

## Page Structure

Build a single high-quality landing page with these sections:

1. Header / Navigation
2. Hero with background drone video
3. Services
4. Why Choose Us / Advantages
5. Portfolio / Visual Showcase
6. About the Company
7. Process / How We Work
8. Contact Form
9. Footer

The page should be easy to scan and should guide visitors toward contacting the company.

---

## Header / Navigation

Header should contain:
- company logo or text logo
- navigation links to page sections
- language switcher
- CTA button such as:
  - "Get a Quote"
  - "Request Inspection"
  - localized equivalents in PL / EN / DE

Header should be clean, sticky if useful, and responsive.

---

## Hero Section

The hero section must include a full-width background drone video.
The video file will be added to the project folder by the user.

Requirements:
- use the provided drone video as the hero background
- add a dark overlay to preserve text readability
- include a strong localized H1
- include a concise localized supporting paragraph
- include primary CTA button
- optionally include secondary CTA button

Hero messaging should communicate:
- drone inspections in Szczecin
- photogrammetry
- thermal imaging
- professional aerial services
- modern equipment and precision

Example messaging direction:
- professional drone inspections in Szczecin
- photogrammetry, 3D models, thermal imaging, and visual inspections
- safe and efficient inspections for industry, energy, and agriculture

Do not use weak generic marketing phrases.
Make it clear what the company does and where it operates.

---

## Services Section

Create service cards with:
- icon or small illustration
- service title
- short professional description

Required services:
1. Drone inspections
2. Photogrammetry and 3D models
3. Thermal imaging
4. Visual inspection of wind turbines
5. Wildlife damage estimation
6. Aerial photography and video

Descriptions should be business-focused and practical.

Service content direction:

### Drone inspections
Inspection of roofs, facades, industrial sites, infrastructure, towers, and hard-to-reach areas using drones.

### Photogrammetry and 3D models
Accurate terrain mapping, orthophotos, documentation, and high-quality 3D models based on drone data.

### Thermal imaging
Thermal inspections for heat loss detection, technical diagnostics, photovoltaic systems, and infrastructure analysis.

### Visual inspection of wind turbines
Safe visual inspections of wind turbine blades and structural elements using drone imaging.

### Wildlife damage estimation
Support for estimating wildlife-related damage in agricultural areas using aerial imaging and field documentation.

### Aerial photography and video
Professional drone visuals for documentation, marketing, presentations, and project reporting.

All service cards must be fully localized.

---

## Why Choose Us Section

Add a section explaining why clients should choose the company.

Focus on:
- professional drone operations
- safety
- precise data collection
- time savings
- lower inspection cost compared to traditional methods
- access to hard-to-reach areas
- high-quality visual and analytical output
- modern equipment
- local presence in Szczecin

Use concise blocks or cards.

---

## Portfolio / Visual Showcase

Create a gallery or portfolio section for drone photos.
The user will add images to the project assets folder.

Requirements:
- responsive grid
- modern hover effects
- lazy loading
- alt texts per locale
- visually polished presentation
- optionally lightbox or modal preview

Showcase should reinforce quality and professionalism.

---

## About the Company

Create a section that explains who the company is and what it specializes in.

Focus on:
- drone services in Szczecin
- experience and professionalism
- modern equipment
- licensed / qualified operators
- accuracy and safety
- support for industrial, energy, agricultural, and infrastructure sectors

Do not make unverifiable claims.
Keep the copy professional and credible.

---

## Process / How We Work

Add a simple process section, for example:
1. Initial contact
2. Scope analysis
3. Drone mission planning
4. Field execution
5. Delivery of materials / report

This helps build trust and improves conversion.

All content must be localized.

---

## Contact Section

At the end of the page include a contact form.

Required fields:
- Name
- Email
- Phone
- Message

Requirements:
- validation
- clear error states
- success message after sending
- responsive layout
- accessible labels
- localized placeholders and validation text

If implementation is needed, use:
- React Hook Form
- client-side validation
- server action or API route for submit handling

The contact section should clearly invite users to request a quote or ask about inspections.

---

## Footer

Footer should include:
- company name
- location: Szczecin, Poland
- email
- phone
- quick navigation links
- language switcher if useful
- optional social links

Optional:
- Google Maps embed or link
- company legal details placeholder

---

## Structured Data

Implement JSON-LD structured data for SEO.

Recommended schema types:
- `LocalBusiness`
- `ProfessionalService`

Include fields such as:
- company name
- description
- address or service area
- Szczecin location
- contact info
- available languages
- service list

Use localized structured content where appropriate.

---

## Performance Requirements

The website must:
- load fast
- be responsive on mobile, tablet, and desktop
- optimize images
- lazy load media where appropriate
- handle hero video efficiently
- avoid heavy unnecessary libraries
- maintain smooth UX

Prioritize Core Web Vitals.

---

## Accessibility Requirements

Ensure:
- semantic HTML
- accessible navigation
- proper labels for form inputs
- keyboard navigation
- sufficient contrast
- alt texts for images
- aria attributes where useful
- readable text over video background

---

## Assets

The user will add:
- a drone video to the project folder
- drone photos / service images to the project folder

Build the project so these assets are easy to replace.

Suggested structure:
- `public/videos/`
- `public/images/`

---

## Suggested Project Structure

If using Next.js:

- `app/[locale]/page.tsx`
- `components/`
- `messages/` or `locales/`
- `public/videos/`
- `public/images/`
- `lib/seo/`
- `lib/i18n/`

Possible components:
- `Header`
- `LanguageSwitcher`
- `Hero`
- `Services`
- `WhyChooseUs`
- `Portfolio`
- `AboutSection`
- `ProcessSection`
- `ContactForm`
- `Footer`

---

## Content Quality Rules

Content must be:
- professional
- specific
- trustworthy
- local SEO aware
- not generic
- not keyword stuffed
- written in natural Polish, English, and German

Avoid:
- filler text
- fake metrics
- fake testimonials
- overly generic startup language
- hobbyist visual tone

The website should feel like a serious commercial service provider.

---

## Expected Result

The final result should be a polished multilingual landing page for a drone inspection company in Szczecin that:

- clearly explains services
- looks professional and modern
- uses a drone video hero section
- presents images and company capabilities effectively
- performs well in SEO in Polish, English, and German
- includes a strong contact section for lead generation
- is built in React, preferably Next.js
