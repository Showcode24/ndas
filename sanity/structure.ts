import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([

      // ── Global ──────────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ── Pages ───────────────────────────────────────────────────
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page')
        ),

      S.divider(),

      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page')
        ),

      S.divider(),

      S.listItem()
        .title('Academics Page')
        .id('academicsPage')
        .child(
          S.document()
            .schemaType('academicsPage')
            .documentId('academicsPage')
            .title('Academics Page')
        ),

      S.listItem()
        .title('Courses')
        .child(
          S.documentTypeList('course')
            .title('Courses')
        ),

      S.divider(),

      S.listItem()
        .title('Admissions Page')
        .id('admissionsPage')
        .child(
          S.document()
            .schemaType('admissionsPage')
            .documentId('admissionsPage')
            .title('Admissions Page')
        ),

      S.divider(),

      S.listItem()
        .title('Facilities Page')
        .id('facilitiesPage')
        .child(
          S.document()
            .schemaType('facilitiesPage')
            .documentId('facilitiesPage')
            .title('Facilities Page')
        ),

      S.divider(),

      S.listItem()
        .title('Partnerships Page')
        .id('partnershipsPage')
        .child(
          S.document()
            .schemaType('partnershipsPage')
            .documentId('partnershipsPage')
            .title('Partnerships Page')
        ),

      S.divider(),

      S.listItem()
        .title('News & Events Page')
        .id('newsPage')
        .child(
          S.document()
            .schemaType('newsPage')
            .documentId('newsPage')
            .title('News & Events Page')
        ),

      S.listItem()
        .title('News Posts')
        .child(
          S.documentTypeList('newsPost')
            .title('News Posts')
        ),

      S.divider(),

      S.listItem()
        .title('Gallery Page')
        .id('galleryPage')
        .child(
          S.document()
            .schemaType('galleryPage')
            .documentId('galleryPage')
            .title('Gallery Page')
        ),

      S.listItem()
        .title('Gallery Images')
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
        ),

    ])
