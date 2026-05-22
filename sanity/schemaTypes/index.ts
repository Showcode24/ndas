import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsSchemaTypes } from './siteSettings.schema'
import { aboutPageSchemaTypes }    from './about.schema'
import { academicsPageSchemaTypes } from './academics.schema'
// import { homePageSchemaTypes }  from './home.schema'

export const schemaTypes: SchemaTypeDefinition[] = [
  ...siteSettingsSchemaTypes,
  ...aboutPageSchemaTypes,
  ...academicsPageSchemaTypes,
]