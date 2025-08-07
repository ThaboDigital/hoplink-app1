declare module '@react-google-maps/api' {
  import { RefObject, ReactNode } from 'react';
  import { Libraries } from '@googlemaps/js-api-loader';

  export interface LoadScriptProps {
    googleMapsApiKey: string;
    libraries?: Libraries;
    language?: string;
    region?: string;
    version?: string;
    loadingElement?: ReactNode;
    preventGoogleFontsLoading?: boolean;
    children?: ReactNode;
    onLoad?: () => void;
  }

  export function useLoadScript(options: LoadScriptProps): {
    isLoaded: boolean;
    loadError: Error | undefined;
  };

  export const GoogleMap: React.FC<any>;
  export const LoadScript: React.FC<LoadScriptProps>;
  export const Marker: React.FC<any>;
  export const DirectionsService: React.FC<any>;
  export const DirectionsRenderer: React.FC<any>;
}