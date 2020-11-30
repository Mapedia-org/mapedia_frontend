export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<CurrentUser>;
  getUser: User;
  getArticleByKey: Article;
  listArticles: ListArticlesResult;
  searchDomains: SearchDomainsResult;
  getDomainByKey: Domain;
  searchLearningMaterialTags: Array<LearningMaterialTagSearchResult>;
  searchResources: SearchResourcesResult;
  getResourceById: Resource;
  getConcept: Concept;
  getDomainConceptByKey: Concept;
  getLearningPath: LearningPath;
  getLearningPathByKey: LearningPath;
};


export type QueryGetUserArgs = {
  key: Scalars['String'];
};


export type QueryGetArticleByKeyArgs = {
  key: Scalars['String'];
};


export type QueryListArticlesArgs = {
  options: ListArticlesOptions;
};


export type QuerySearchDomainsArgs = {
  options: SearchDomainsOptions;
};


export type QueryGetDomainByKeyArgs = {
  key: Scalars['String'];
};


export type QuerySearchLearningMaterialTagsArgs = {
  options: SearchLearningMaterialTagsOptions;
};


export type QuerySearchResourcesArgs = {
  query: Scalars['String'];
  options: SearchResourcesOptions;
};


export type QueryGetResourceByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetConceptArgs = {
  _id: Scalars['String'];
};


export type QueryGetDomainConceptByKeyArgs = {
  domainKey: Scalars['String'];
  conceptKey: Scalars['String'];
};


export type QueryGetLearningPathArgs = {
  _id: Scalars['String'];
};


export type QueryGetLearningPathByKeyArgs = {
  key: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  loginGoogle: LoginResponse;
  register: CurrentUser;
  registerGoogle: CurrentUser;
  verifyEmailAddress: VerifyEmailResponse;
  adminUpdateUser: User;
  createArticle: Article;
  updateArticle: Article;
  deleteArticle: DeleteArticleResponse;
  createDomain: Domain;
  updateDomain: Domain;
  deleteDomain: DeleteDomainResponse;
  addTagsToLearningMaterial: LearningMaterial;
  removeTagsFromLearningMaterial: LearningMaterial;
  attachLearningMaterialToDomain: LearningMaterial;
  detachLearningMaterialFromDomain: LearningMaterial;
  attachLearningMaterialCoversConcepts: LearningMaterial;
  detachLearningMaterialCoversConcepts: LearningMaterial;
  rateLearningMaterial: LearningMaterial;
  createResource: Resource;
  updateResource: Resource;
  deleteResource: DeleteResourceResponse;
  addResourceToDomain: Resource;
  setResourcesConsumed: Array<Resource>;
  voteResource: Resource;
  addSubResource: SubResourceCreatedResult;
  createSubResourceSeries: SubResourceSeriesCreatedResult;
  addSubResourceToSeries: SubResourceSeriesCreatedResult;
  addConceptToDomain: Concept;
  updateConcept: Concept;
  deleteConcept: DeleteConceptResult;
  setConceptsKnown: Array<Concept>;
  setConceptsUnknown: Array<Concept>;
  addConceptReferencesConcept: Concept;
  removeConceptReferencesConcept: Concept;
  createLearningPath: LearningPath;
  updateLearningPath: LearningPath;
  deleteLearningPath: DeleteLearningPathResult;
  addComplementaryResourceToLearningPath: ComplementaryResourceUpdatedResult;
  removeComplementaryResourceFromLearningPath: ComplementaryResourceUpdatedResult;
  startLearningPath: LearningPathStartedResult;
  completeLearningPath: LearningPathCompletedResult;
  updateConceptBelongsToDomain: ConceptBelongsToDomain;
  addConceptBelongsToConcept: Concept;
  removeConceptBelongsToConcept: Concept;
  updateConceptBelongsToConcept: Concept;
  addDomainBelongsToDomain: Domain;
  removeDomainBelongsToDomain: Domain;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  discourseSSO?: Maybe<DiscourseSso>;
};


export type MutationLoginGoogleArgs = {
  idToken: Scalars['String'];
  discourseSSO?: Maybe<DiscourseSso>;
};


export type MutationRegisterArgs = {
  payload: RegisterPayload;
};


export type MutationRegisterGoogleArgs = {
  payload: RegisterGooglePayload;
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String'];
  payload: AdminUpdateUserPayload;
};


export type MutationCreateArticleArgs = {
  payload: CreateArticlePayload;
};


export type MutationUpdateArticleArgs = {
  id: Scalars['String'];
  payload: UpdateArticlePayload;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationCreateDomainArgs = {
  payload: CreateDomainPayload;
};


export type MutationUpdateDomainArgs = {
  id: Scalars['String'];
  payload: UpdateDomainPayload;
};


export type MutationDeleteDomainArgs = {
  id: Scalars['String'];
};


export type MutationAddTagsToLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationRemoveTagsFromLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationAttachLearningMaterialToDomainArgs = {
  domainId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationDetachLearningMaterialFromDomainArgs = {
  domainId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationAttachLearningMaterialCoversConceptsArgs = {
  learningMaterialId: Scalars['String'];
  conceptIds: Array<Scalars['String']>;
};


export type MutationDetachLearningMaterialCoversConceptsArgs = {
  learningMaterialId: Scalars['String'];
  conceptIds: Array<Scalars['String']>;
};


export type MutationRateLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationCreateResourceArgs = {
  payload: CreateResourcePayload;
};


export type MutationUpdateResourceArgs = {
  _id: Scalars['String'];
  payload: UpdateResourcePayload;
};


export type MutationDeleteResourceArgs = {
  _id: Scalars['String'];
};


export type MutationAddResourceToDomainArgs = {
  domainId: Scalars['String'];
  payload: CreateResourcePayload;
};


export type MutationSetResourcesConsumedArgs = {
  payload: SetResourcesConsumedPayload;
};


export type MutationVoteResourceArgs = {
  resourceId: Scalars['String'];
  value: ResourceVoteValue;
};


export type MutationAddSubResourceArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationCreateSubResourceSeriesArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddSubResourceToSeriesArgs = {
  parentResourceId: Scalars['String'];
  previousResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddConceptToDomainArgs = {
  domainId: Scalars['String'];
  payload: AddConceptToDomainPayload;
};


export type MutationUpdateConceptArgs = {
  _id: Scalars['String'];
  payload: UpdateConceptPayload;
};


export type MutationDeleteConceptArgs = {
  _id: Scalars['String'];
};


export type MutationSetConceptsKnownArgs = {
  payload: SetConceptKnownPayload;
};


export type MutationSetConceptsUnknownArgs = {
  conceptIds: Array<Scalars['String']>;
};


export type MutationAddConceptReferencesConceptArgs = {
  conceptId: Scalars['String'];
  referencedConceptId: Scalars['String'];
};


export type MutationRemoveConceptReferencesConceptArgs = {
  conceptId: Scalars['String'];
  referencedConceptId: Scalars['String'];
};


export type MutationCreateLearningPathArgs = {
  payload: CreateLearningPathPayload;
};


export type MutationUpdateLearningPathArgs = {
  _id: Scalars['String'];
  payload: UpdateLearningPathPayload;
};


export type MutationDeleteLearningPathArgs = {
  _id: Scalars['String'];
};


export type MutationAddComplementaryResourceToLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationRemoveComplementaryResourceFromLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationStartLearningPathArgs = {
  learningPathId: Scalars['String'];
};


export type MutationCompleteLearningPathArgs = {
  learningPathId: Scalars['String'];
  completed: Scalars['Boolean'];
};


export type MutationUpdateConceptBelongsToDomainArgs = {
  conceptId: Scalars['String'];
  domainId: Scalars['String'];
  payload: UpdateConceptBelongsToDomainPayload;
};


export type MutationAddConceptBelongsToConceptArgs = {
  parentConceptId: Scalars['String'];
  subConceptId: Scalars['String'];
};


export type MutationRemoveConceptBelongsToConceptArgs = {
  parentConceptId: Scalars['String'];
  subConceptId: Scalars['String'];
};


export type MutationUpdateConceptBelongsToConceptArgs = {
  parentConceptId: Scalars['String'];
  subConceptId: Scalars['String'];
  payload: UpdateConceptBelongsToConceptPayload;
};


export type MutationAddDomainBelongsToDomainArgs = {
  parentDomainId: Scalars['String'];
  subDomainId: Scalars['String'];
};


export type MutationRemoveDomainBelongsToDomainArgs = {
  parentDomainId: Scalars['String'];
  subDomainId: Scalars['String'];
};


export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  email: Scalars['String'];
  displayName: Scalars['String'];
  key: Scalars['String'];
  role: UserRole;
  articles?: Maybe<ListArticlesResult>;
  createdLearningPaths?: Maybe<Array<LearningPath>>;
  startedLearningPaths?: Maybe<Array<LearningPathStartedItem>>;
};


export type CurrentUserArticlesArgs = {
  options: ListArticlesOptions;
};


export type CurrentUserCreatedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};


export type CurrentUserStartedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  displayName: Scalars['String'];
  role: UserRole;
  key: Scalars['String'];
  articles?: Maybe<ListArticlesResult>;
};


export type UserArticlesArgs = {
  options: ListArticlesOptions;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['String'];
  key: Scalars['String'];
  contentType: ArticleContentType;
  title: Scalars['String'];
  content: Scalars['String'];
  author?: Maybe<User>;
};

export type ListArticlesResult = {
  __typename?: 'ListArticlesResult';
  items: Array<Article>;
};

export type ListArticlesOptions = {
  filter?: Maybe<ListArticlesFilter>;
  pagination?: Maybe<PaginationOptions>;
};

export type SearchDomainsResult = {
  __typename?: 'SearchDomainsResult';
  items: Array<Domain>;
};

export type SearchDomainsOptions = {
  query?: Maybe<Scalars['String']>;
  pagination: PaginationOptions;
};

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['String'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  concepts?: Maybe<DomainConceptsResults>;
  resources?: Maybe<DomainResourcesResults>;
  learningPaths?: Maybe<DomainLearningPathsResults>;
  learningMaterials?: Maybe<DomainLearningMaterialsResults>;
  subDomains?: Maybe<Array<DomainBelongsToDomainItem>>;
  parentDomains?: Maybe<Array<DomainBelongsToDomainItem>>;
};


export type DomainConceptsArgs = {
  options: DomainConceptsOptions;
};


export type DomainResourcesArgs = {
  options: DomainResourcesOptions;
};


export type DomainLearningPathsArgs = {
  options: DomainLearningPathsOptions;
};


export type DomainLearningMaterialsArgs = {
  options: DomainLearningMaterialsOptions;
};

export type LearningMaterialTagSearchResult = {
  __typename?: 'LearningMaterialTagSearchResult';
  name: Scalars['String'];
  usageCount?: Maybe<Scalars['Int']>;
};

export type SearchLearningMaterialTagsOptions = {
  query: Scalars['String'];
  pagination: PaginationOptions;
};

export type SearchResourcesResult = {
  __typename?: 'SearchResourcesResult';
  items: Array<Resource>;
};

export type SearchResourcesOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type Resource = LearningMaterial & {
  __typename?: 'Resource';
  _id: Scalars['String'];
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  tags?: Maybe<Array<LearningMaterialTag>>;
  url: Scalars['String'];
  upvotes?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  consumed?: Maybe<ConsumedResource>;
  creator?: Maybe<User>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
  subResources?: Maybe<Array<Resource>>;
  parentResources?: Maybe<Array<Resource>>;
  subResourceSeries?: Maybe<Array<Resource>>;
  seriesParentResource?: Maybe<Resource>;
  nextResource?: Maybe<Resource>;
  previousResource?: Maybe<Resource>;
};


export type ResourceCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};

export type Concept = {
  __typename?: 'Concept';
  _id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  domain?: Maybe<Domain>;
  coveredByResources?: Maybe<ConceptCoveredByResourcesResults>;
  known?: Maybe<KnownConcept>;
  referencingConcepts?: Maybe<Array<ConceptReferencesConceptItem>>;
  referencedByConcepts?: Maybe<Array<ConceptReferencesConceptItem>>;
  subConcepts?: Maybe<Array<ConceptBelongsToConceptItem>>;
  parentConcepts?: Maybe<Array<ConceptBelongsToConceptItem>>;
};


export type ConceptCoveredByResourcesArgs = {
  options: ConceptCoveredByResourcesOptions;
};

export type LearningPath = LearningMaterial & {
  __typename?: 'LearningPath';
  _id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  resourceItems?: Maybe<Array<LearningPathResourceItem>>;
  complementaryResources?: Maybe<Array<Resource>>;
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
  started?: Maybe<LearningPathStarted>;
  createdBy?: Maybe<User>;
  startedBy?: Maybe<LearningPathStartedByResults>;
};


export type LearningPathCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};


export type LearningPathStartedByArgs = {
  options: LearningPathStartedByOptions;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  currentUser: CurrentUser;
  jwt: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
};

export type DiscourseSso = {
  sig: Scalars['String'];
  sso: Scalars['String'];
};

export type RegisterPayload = {
  key: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterGooglePayload = {
  key: Scalars['String'];
  displayName: Scalars['String'];
  idToken: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  email: Scalars['String'];
};

export type AdminUpdateUserPayload = {
  displayName?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  active?: Maybe<Scalars['Boolean']>;
};

export type CreateArticlePayload = {
  contentType: ArticleContentType;
  title: Scalars['String'];
  content: Scalars['String'];
};

export type UpdateArticlePayload = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateDomainPayload = {
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateDomainPayload = {
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteDomainResponse = {
  __typename?: 'DeleteDomainResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LearningMaterial = {
  _id: Scalars['String'];
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
};


export type LearningMaterialCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};

export type CreateResourcePayload = {
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateResourcePayload = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ResourceType>;
  mediaType?: Maybe<ResourceMediaType>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
};

export type DeleteResourceResponse = {
  __typename?: 'DeleteResourceResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SetResourcesConsumedPayload = {
  resources: Array<SetResourcesConsumedPayloadResourcesField>;
};

export enum ResourceVoteValue {
  Up = 'up',
  Down = 'down'
}

export type SubResourceCreatedResult = {
  __typename?: 'SubResourceCreatedResult';
  parentResource: Resource;
  subResource: Resource;
};

export type SubResourceSeriesCreatedResult = {
  __typename?: 'SubResourceSeriesCreatedResult';
  seriesParentResource: Resource;
  subResource: Resource;
};

export type AddConceptToDomainPayload = {
  key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Float']>;
};

export type UpdateConceptPayload = {
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteConceptResult = {
  __typename?: 'DeleteConceptResult';
  success: Scalars['Boolean'];
  _id: Scalars['String'];
};

export type SetConceptKnownPayload = {
  concepts: Array<SetConceptKnownPayloadConceptsField>;
};

export type CreateLearningPathPayload = {
  name: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  resourceItems: Array<CreateLearningPathResourceItem>;
};

export type UpdateLearningPathPayload = {
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  resourceItems?: Maybe<Array<CreateLearningPathResourceItem>>;
};

export type DeleteLearningPathResult = {
  __typename?: 'DeleteLearningPathResult';
  success: Scalars['Boolean'];
  _id: Scalars['String'];
};

export type ComplementaryResourceUpdatedResult = {
  __typename?: 'ComplementaryResourceUpdatedResult';
  resource: Resource;
  learningPath: LearningPath;
};

export type LearningPathStartedResult = {
  __typename?: 'LearningPathStartedResult';
  user: CurrentUser;
  learningPath: LearningPath;
};

export type LearningPathCompletedResult = {
  __typename?: 'LearningPathCompletedResult';
  user: CurrentUser;
  learningPath: LearningPath;
};

export type ConceptBelongsToDomain = {
  __typename?: 'ConceptBelongsToDomain';
  index: Scalars['Float'];
};

export type UpdateConceptBelongsToDomainPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type UpdateConceptBelongsToConceptPayload = {
  index?: Maybe<Scalars['Float']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR',
  User = 'USER'
}

export type UserLearningPathsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningPathStartedItem = {
  __typename?: 'LearningPathStartedItem';
  learningPath: LearningPath;
  startedAt: Scalars['DateTime'];
  completedAt?: Maybe<Scalars['DateTime']>;
};

export enum ArticleContentType {
  Markdown = 'markdown'
}

export type ListArticlesFilter = {
  contentType?: Maybe<ArticleContentType>;
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DomainConceptsResults = {
  __typename?: 'DomainConceptsResults';
  items: Array<DomainConceptsItem>;
};

export type DomainConceptsOptions = {
  pagination?: Maybe<PaginationOptions>;
  sorting?: Maybe<DomainConceptSortingOptions>;
};

export type DomainResourcesResults = {
  __typename?: 'DomainResourcesResults';
  items: Array<Resource>;
};

export type DomainResourcesOptions = {
  sortingType: DomainResourcesSortingType;
  query?: Maybe<Scalars['String']>;
  filter: DomainResourcesFilterOptions;
};

export type DomainLearningPathsResults = {
  __typename?: 'DomainLearningPathsResults';
  items: Array<LearningPath>;
};

export type DomainLearningPathsOptions = {
  pagination?: Maybe<PaginationOptions>;
  sorting: DomainLearningPathsSortingOptions;
};

export type DomainLearningMaterialsResults = {
  __typename?: 'DomainLearningMaterialsResults';
  items: Array<LearningMaterial>;
};

export type DomainLearningMaterialsOptions = {
  sortingType: DomainLearningMaterialsSortingType;
  query?: Maybe<Scalars['String']>;
  filter: DomainLearningMaterialsFilterOptions;
};

export type DomainBelongsToDomainItem = {
  __typename?: 'DomainBelongsToDomainItem';
  domain: Domain;
  relationship: DomainBelongsToDomain;
};

export enum ResourceType {
  Article = 'article',
  ArticleSeries = 'article_series',
  Course = 'course',
  Podcast = 'podcast',
  PodcastSeries = 'podcast_series',
  YoutubeVideo = 'youtube_video',
  YoutubeVideoSeries = 'youtube_video_series',
  Book = 'book',
  Talk = 'talk',
  Documentary = 'documentary',
  Website = 'website',
  VideoGame = 'video_game',
  Infographic = 'infographic',
  Tweet = 'tweet',
  Other = 'other'
}

export enum ResourceMediaType {
  Video = 'video',
  Text = 'text',
  Audio = 'audio',
  InteractiveContent = 'interactive_content'
}

export type LearningMaterialTag = {
  __typename?: 'LearningMaterialTag';
  name: Scalars['String'];
};

export type ConsumedResource = {
  __typename?: 'ConsumedResource';
  openedAt?: Maybe<Scalars['DateTime']>;
  consumedAt?: Maybe<Scalars['DateTime']>;
};

export type LearningMaterialCoveredConceptsResults = {
  __typename?: 'LearningMaterialCoveredConceptsResults';
  items: Array<Concept>;
};

export type LearningMaterialCoveredConceptsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningMaterialCoveredConceptsByDomainItem = {
  __typename?: 'LearningMaterialCoveredConceptsByDomainItem';
  domain: Domain;
  coveredConcepts: Array<Concept>;
};

export type ConceptCoveredByResourcesResults = {
  __typename?: 'ConceptCoveredByResourcesResults';
  items: Array<Resource>;
};

export type ConceptCoveredByResourcesOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type KnownConcept = {
  __typename?: 'KnownConcept';
  level: Scalars['Float'];
};

export type ConceptReferencesConceptItem = {
  __typename?: 'ConceptReferencesConceptItem';
  concept: Concept;
  relationship: ConceptReferencesConcept;
};

export type ConceptBelongsToConceptItem = {
  __typename?: 'ConceptBelongsToConceptItem';
  concept: Concept;
  relationship: ConceptBelongsToConcept;
};

export type LearningPathResourceItem = {
  __typename?: 'LearningPathResourceItem';
  resource: Resource;
  learningPathId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type LearningPathStarted = {
  __typename?: 'LearningPathStarted';
  startedAt: Scalars['DateTime'];
  completedAt?: Maybe<Scalars['DateTime']>;
};

export type LearningPathStartedByResults = {
  __typename?: 'LearningPathStartedByResults';
  items: Array<LearningPathStartedByItem>;
  count: Scalars['Int'];
};

export type LearningPathStartedByOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type SetResourcesConsumedPayloadResourcesField = {
  resourceId: Scalars['String'];
  consumed?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['Boolean']>;
};

export type SetConceptKnownPayloadConceptsField = {
  conceptId: Scalars['String'];
  level?: Maybe<Scalars['Float']>;
};

export type CreateLearningPathResourceItem = {
  resourceId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type DomainConceptsItem = {
  __typename?: 'DomainConceptsItem';
  concept: Concept;
  relationship: ConceptBelongsToDomain;
};

export type DomainConceptSortingOptions = {
  entity: DomainConceptSortingEntities;
  field: DomainConceptSortingFields;
  direction: SortingDirection;
};

export enum DomainResourcesSortingType {
  Recommended = 'recommended',
  Newest = 'newest'
}

export type DomainResourcesFilterOptions = {
  resourceTypeIn?: Maybe<Array<ResourceType>>;
  consumedByUser: Scalars['Boolean'];
};

export type DomainLearningPathsSortingOptions = {
  field: DomainLearningPathsSortingFields;
  direction: SortingDirection;
};

export enum DomainLearningMaterialsSortingType {
  Recommended = 'recommended',
  Newest = 'newest'
}

export type DomainLearningMaterialsFilterOptions = {
  resourceTypeIn?: Maybe<Array<ResourceType>>;
  completedByUser: Scalars['Boolean'];
  learningMaterialTypeIn?: Maybe<Array<LearningMaterialType>>;
};

export type DomainBelongsToDomain = {
  __typename?: 'DomainBelongsToDomain';
  index: Scalars['Float'];
};

export type ConceptReferencesConcept = {
  __typename?: 'ConceptReferencesConcept';
  strength: Scalars['Float'];
};

export type ConceptBelongsToConcept = {
  __typename?: 'ConceptBelongsToConcept';
  index: Scalars['Float'];
};

export type LearningPathStartedByItem = {
  __typename?: 'LearningPathStartedByItem';
  user: User;
  startedAt: Scalars['DateTime'];
  completedAt?: Maybe<Scalars['DateTime']>;
};

export enum DomainConceptSortingEntities {
  Concept = 'concept',
  Relationship = 'relationship'
}

export enum DomainConceptSortingFields {
  Id = '_id',
  Index = 'index'
}

export enum SortingDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum DomainLearningPathsSortingFields {
  CreatedAt = 'createdAt'
}

export enum LearningMaterialType {
  Resource = 'Resource',
  LearningPath = 'LearningPath'
}
