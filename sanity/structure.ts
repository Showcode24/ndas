import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([

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


    ])