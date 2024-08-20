export type TSpoilerContentTypes = "User";

interface ISpoilerBaseContentConfig {
  contentType: TSpoilerContentTypes;
  additionalStates?: { [key: string]: boolean };
}

interface ISpoilerUserContentConfig {
  contentType: "User";
  additionalStates: {
    is_awakened: boolean;
  };
}

type TSpoilerContent = ISpoilerBaseContentConfig | ISpoilerUserContentConfig;

export interface ISpoilerProps {
  $showSpoilers: boolean;
  $spoilerContent: TSpoilerContent;
}

export interface ITableProps {
  $alternate?: boolean;
}

export interface IDataTextProps {
  $showSpoilers: boolean;
  $useSpoilerBlock: boolean;
  $awakening?: {
    $isAwakend: boolean;
    $isSpoiler: boolean;
  };
  $isArtificial?: boolean;
}