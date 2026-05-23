import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsSchemaTypes }    from './siteSettings.schema'
import { aboutPageSchemaTypes }        from './about.schema'
import { academicsPageSchemaTypes }    from './academics.schema'
import { courseSchemaTypes }           from './course.schema'
import { homePageSchemaTypes }         from './home.schema'
import { admissionsPageSchemaTypes }   from './admissions.schema'
import { facilitiesPageSchemaTypes }   from './facilities.schema'
import { partnershipsPageSchemaTypes } from './partnerships.schema'
import { newsPageSchemaTypes }         from './news.schema'
import { galleryPageSchemaTypes }      from './gallery.schema'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site-wide shared types must come first
  ...siteSettingsSchemaTypes,

  // Page-level schemas
  ...aboutPageSchemaTypes,
  ...academicsPageSchemaTypes,
  ...courseSchemaTypes,           // standalone course documents (linked by slug)
  ...homePageSchemaTypes,
  ...admissionsPageSchemaTypes,
  ...facilitiesPageSchemaTypes,
  ...partnershipsPageSchemaTypes,
  ...newsPageSchemaTypes,
  ...galleryPageSchemaTypes,
]
