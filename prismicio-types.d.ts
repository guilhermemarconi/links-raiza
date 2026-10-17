import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *Link → Links*
 */
export interface LinkDocumentDataLinksItem {
	/**
	 * Imagem field in *Link → Links*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link.links[].thumbnail
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	thumbnail: prismic.ImageField<never>;
	
	/**
	 * Título field in *Link → Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link.links[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * URL do link field in *Link → Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://
	 * - **API ID Path**: link.links[].url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	url: prismic.KeyTextField;
}

/**
 * Content for Link documents
 */
interface LinkDocumentData {
	/**
	 * Título do documento (ignorar) field in *Link*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Links
	 * - **API ID Path**: link.doc_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	doc_title: prismic.KeyTextField;
	
	/**
	 * Links field in *Link*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link.links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	links: prismic.GroupField<Simplify<LinkDocumentDataLinksItem>>;
}

/**
 * Link document from Prismic
 *
 * - **API ID**: `link`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LinkDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LinkDocumentData>, "link", Lang>;

/**
 * Content for Perfil documents
 */
interface ProfileDocumentData {
	/**
	 * Foto de perfil field in *Perfil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: profile.profile_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	profile_image: prismic.ImageField<never>;

	/**
	 * Nome field in *Perfil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Raíza Souto
	 * - **API ID Path**: profile.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;

	/**
	 * Descrição field in *Perfil*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: profile.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;

	/**
	 * Título da página field in *Perfil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Raíza Souto | Links
	 * - **API ID Path**: profile.meta_title
	 * - **Tab**: Metadados
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;

	/**
	 * Descrição da página field in *Perfil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: profile.meta_description
	 * - **Tab**: Metadados
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;

	/**
	 * Imagem de compartilhamento field in *Perfil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: profile.meta_image
	 * - **Tab**: Metadados
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Perfil document from Prismic
 *
 * - **API ID**: `profile`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProfileDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ProfileDocumentData>, "profile", Lang>;

/**
 * Item in *Produtos → Produtos (a ordem aqui é a ordem na página)*
 */
export interface ProductsDocumentDataProductsItem {
	/**
	 * Nome interno field in *Produtos → Produtos*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: COLUNA
	 * - **API ID Path**: products.products[].name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;

	/**
	 * Imagem do card field in *Produtos → Produtos*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: products.products[].image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Descrição (obrigatória, usada como texto alternativo da imagem) field in *Produtos → Produtos*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: products.products[].description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;

	/**
	 * URL (sem URL, o card não aparece) field in *Produtos → Produtos*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://
	 * - **API ID Path**: products.products[].url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	url: prismic.KeyTextField;
}

/**
 * Content for Produtos documents
 */
interface ProductsDocumentData {
	/**
	 * Produtos (a ordem aqui é a ordem na página) field in *Produtos*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: products.products[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	products: prismic.GroupField<Simplify<ProductsDocumentDataProductsItem>>;
}

/**
 * Produtos document from Prismic
 *
 * - **API ID**: `products`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProductsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ProductsDocumentData>, "products", Lang>;

/**
 * Item in *Redes sociais → Redes sociais*
 */
export interface SocialLinksDocumentDataSocialLinksItem {
	/**
	 * Rede field in *Redes sociais → Redes sociais*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_links.social_links[].network
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	network: prismic.SelectField<"Instagram" | "YouTube" | "TikTok" | "LinkedIn", "filled">;

	/**
	 * URL (sem URL, o ícone não aparece) field in *Redes sociais → Redes sociais*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://
	 * - **API ID Path**: social_links.social_links[].url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	url: prismic.KeyTextField;
}

/**
 * Content for Redes sociais documents
 */
interface SocialLinksDocumentData {
	/**
	 * Redes sociais field in *Redes sociais*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_links.social_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_links: prismic.GroupField<Simplify<SocialLinksDocumentDataSocialLinksItem>>;
}

/**
 * Redes sociais document from Prismic
 *
 * - **API ID**: `social_links`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SocialLinksDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SocialLinksDocumentData>, "social_links", Lang>;

export type AllDocumentTypes = LinkDocument | ProductsDocument | ProfileDocument | SocialLinksDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			LinkDocument,
			LinkDocumentData,
			LinkDocumentDataLinksItem,
			ProfileDocument,
			ProfileDocumentData,
			AllDocumentTypes
		}
	}
}