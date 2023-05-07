export enum Theme {
  default = 'default',
  light = 'light',
  dark = 'dark',
  mint = 'mint',
  green = 'green',
  peach = 'peach',
  lavender = 'lavender',
  blonde = 'blonde'
}

export enum ThemeColor {
  lightGray = '#dcdcdc',
  mediumGray = '#969696',
  darkGray = '#464646',
  lightBlack = '#1C1D1C',
  lightGreen = '#75B680',
  mint = '#bce0c7',
  green = '#364239',
  peach = '#f5d4d2',
  lavender = '#dbccf3',
  blonde = '#ffebB8',
  white = 'white',
  black = 'black'
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type Maybe<T> = T | null

export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BlockchainData: any
  BroadcastId: any
  ChainId: any
  CollectModuleData: any
  ContentEncryptionKey: any
  ContractAddress: any
  CreateHandle: any
  Cursor: any
  DateTime: any
  EncryptedValueScalar: any
  Ens: any
  EthereumAddress: any
  FollowModuleData: any
  Handle: any
  HandleClaimIdScalar: any
  IfpsCid: any
  InternalPublicationId: any
  Jwt: any
  LimitScalar: any
  Locale: any
  Markdown: any
  MimeType: any
  NftOwnershipId: any
  Nonce: any
  NotificationId: any
  ProfileId: any
  ProfileInterest: any
  ProxyActionId: any
  PublicationId: any
  PublicationTag: any
  PublicationUrl: any
  ReactionId: any
  ReferenceModuleData: any
  Search: any
  Signature: any
  Sources: any
  TimestampScalar: any
  TokenId: any
  TxHash: any
  TxId: any
  UnixTimestamp: any
  Url: any
  Void: any
}

export type ProfileHandle = {
  handle: Scalars['Handle'];
  picture?: string;
}

export type Profile = {
  __typename?: 'Profile'
  /** Optionals param to add extra attributes on the metadata */
  attributes?: Maybe<Array<Attribute>>
  /** Bio of the profile */
  bio?: Maybe<Scalars['String']>
  /** The cover picture for the profile */
  coverPicture?: Maybe<ProfileMedia>
  /** The dispatcher */
  dispatcher?: Maybe<Dispatcher>
  /** The follow module */
  followModule?: Maybe<FollowModule>
  /** Follow nft address */
  followNftAddress?: Maybe<Scalars['ContractAddress']>
  /** The profile handle */
  handle: Scalars['Handle']
  /** The profile id */
  id: Scalars['ProfileId']
  /** The profile interests */
  interests?: Maybe<Array<Scalars['ProfileInterest']>>
  /** Is the profile default */
  isDefault: Scalars['Boolean']
  isFollowedByMe: Scalars['Boolean']
  isFollowing: Scalars['Boolean']
  /** Metadata url */
  metadata?: Maybe<Scalars['Url']>
  /** Name of the profile */
  name?: Maybe<Scalars['String']>
  /** The on chain identity */
  onChainIdentity: OnChainIdentity
  /** Who owns the profile */
  ownedBy: Scalars['EthereumAddress']
  /** The picture for the profile */
  picture?: Maybe<ProfileMedia>
  /** Profile stats */
  stats: ProfileStats
}

export type ProfileStats = {
  __typename?: 'ProfileStats'
  commentsTotal: Scalars['Int']
  id: Scalars['ProfileId']
  mirrorsTotal: Scalars['Int']
  postsTotal: Scalars['Int']
  publicationsTotal: Scalars['Int']
  /** Total collects count */
  totalCollects: Scalars['Int']
  /** Total comment count */
  totalComments: Scalars['Int']
  /** Total follower count */
  totalFollowers: Scalars['Int']
  /** Total following count (remember the wallet follows not profile so will be same for every profile they own) */
  totalFollowing: Scalars['Int']
  /** Total mirror count */
  totalMirrors: Scalars['Int']
  /** Total post count */
  totalPosts: Scalars['Int']
  /** Total publication count */
  totalPublications: Scalars['Int']
}


export type ProfileMedia = MediaSet | NftImage

export type FollowModule = FeeFollowModuleSettings | ProfileFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings

export type Dispatcher = {
  __typename?: 'Dispatcher'
  /** The dispatcher address */
  address: Scalars['EthereumAddress']
  /** If the dispatcher can use the relay */
  canUseRelay: Scalars['Boolean']
}

export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
  ProfileFollowModule = 'ProfileFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule'
}

export type FeeFollowModuleSettings = {
  __typename?: 'FeeFollowModuleSettings'
  /** The collect module amount info */
  amount: ModuleFeeAmount
  contractAddress: Scalars['ContractAddress']
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress']
  /** The follow modules enum */
  type: FollowModules
}

export type ProfileFollowModuleSettings = {
  __typename?: 'ProfileFollowModuleSettings'
  contractAddress: Scalars['ContractAddress']
  /** The follow module enum */
  type: FollowModules
}

export type UnknownFollowModuleSettings = {
  __typename?: 'UnknownFollowModuleSettings'
  contractAddress: Scalars['ContractAddress']
  /** The data used to setup the module which you can decode with your known ABI  */
  followModuleReturnData: Scalars['FollowModuleData']
  /** The follow modules enum */
  type: FollowModules
}

export type RevertFollowModuleSettings = {
  __typename?: 'RevertFollowModuleSettings'
  contractAddress: Scalars['ContractAddress']
  /** The follow module enum */
  type: FollowModules
}

export type NftImage = {
  __typename?: 'NftImage'
  /** The token image nft */
  chainId: Scalars['Int']
  /** The contract address */
  contractAddress: Scalars['ContractAddress']
  /** The token id of the nft */
  tokenId: Scalars['String']
  /** The token image nft */
  uri: Scalars['Url']
  /** If the NFT is verified */
  verified: Scalars['Boolean']
}

export type Media = {
  __typename?: 'Media'
  /** The alt tags for accessibility */
  altTag?: Maybe<Scalars['String']>
  /** The cover for any video or audio you attached */
  cover?: Maybe<Scalars['Url']>
  /** Height - will always be null on the public API */
  height?: Maybe<Scalars['Int']>
  /** The image/audio/video mime type for the publication */
  mimeType?: Maybe<Scalars['MimeType']>
  /** Size - will always be null on the public API */
  size?: Maybe<Scalars['Int']>
  /** The token image nft */
  url: Scalars['Url']
  /** Width - will always be null on the public API */
  width?: Maybe<Scalars['Int']>
}

export type MediaSet = {
  __typename?: 'MediaSet'
  /**
   * Medium media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  medium?: Maybe<Media>
  /** Original media */
  original: Media
  /**
   * Small media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  small?: Maybe<Media>
}

export type Attribute = {
  __typename?: 'Attribute'
  /** The display type */
  displayType?: Maybe<Scalars['String']>
  /** identifier of this attribute, we will update by this id  */
  key: Scalars['String']
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType?: Maybe<Scalars['String']>
  /** Value attribute */
  value: Scalars['String']
}

export type EnsOnChainIdentity = {
  __typename?: 'EnsOnChainIdentity'
  /** The default ens mapped to this address */
  name?: Maybe<Scalars['Ens']>
}

export type SybilDotOrgIdentity = {
  __typename?: 'SybilDotOrgIdentity'
  source: SybilDotOrgIdentitySource
  /** The sybil dot org status */
  verified: Scalars['Boolean']
}

export type SybilDotOrgTwitterIdentity = {
  __typename?: 'SybilDotOrgTwitterIdentity'
  handle?: Maybe<Scalars['String']>
}

export type SybilDotOrgIdentitySource = {
  __typename?: 'SybilDotOrgIdentitySource'
  twitter: SybilDotOrgTwitterIdentity
}

export type WorldcoinIdentity = {
  __typename?: 'WorldcoinIdentity'
  /** If the profile has verified as a user */
  isHuman: Scalars['Boolean']
}

export type OnChainIdentity = {
  __typename?: 'OnChainIdentity'
  /** The ens information */
  ens?: Maybe<EnsOnChainIdentity>
  /** The POH status */
  proofOfHumanity: Scalars['Boolean']
  /** The sybil dot org information */
  sybilDotOrg: SybilDotOrgIdentity
  /** The worldcoin identity */
  worldcoin: WorldcoinIdentity
}

export type Erc20 = {
  __typename?: 'Erc20'
  /** The erc20 address */
  address: Scalars['ContractAddress']
  /** Decimal places for the token */
  decimals: Scalars['Int']
  /** Name of the symbol */
  name: Scalars['String']
  /** Symbol for the token */
  symbol: Scalars['String']
}

export type ModuleFeeAmount = {
  __typename?: 'ModuleFeeAmount'
  /** The erc20 token info */
  asset: Erc20
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String']
}
