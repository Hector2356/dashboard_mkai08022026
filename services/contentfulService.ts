
import { createClient, ContentfulClientApi, EntryCollection, Entry } from 'contentful';
import {
  mapContentfulEntryToAlbum,
  mapContentfulEntryToService,
  mapContentfulEntryToRelease,
  mapContentfulEntryToTestimonial,
  mapContentfulEntryToMikUniverseService,
  mapContentfulEntryToMikaiRelease,
  mapContentfulEntryToMikaiLanding,
} from '../utils/dataMapper';
import type { Album, Service, Release, Testimonial, MikUniverseService, MikaiRelease, MikaiLandingData } from '../types';
import { MOCK_TESTIMONIALS } from '../constants';


let client: ContentfulClientApi<any> | null = null;

export const initClient = (spaceId: string, accessToken: string) => {
  client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });
};

const getClient = (): ContentfulClientApi<any> => {
  if (!client) {
    throw new Error('Contentful client not initialized. Call initClient() first.');
  }
  return client;
};

async function fetchEntries<T>(contentType: string, mapper: (entry: Entry<any>) => T): Promise<T[]> {
  try {
    const client = getClient();
    const response: EntryCollection<any> = await client.getEntries({
      content_type: contentType,
      order: ['-sys.createdAt'],
      include: 2, // Important to fetch referenced tracks and platforms
    });
    if (response.items) {
      return response.items.map(mapper);
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export const fetchAlbums = (): Promise<Album[]> => fetchEntries('album', mapContentfulEntryToAlbum);
export const fetchServices = (): Promise<Service[]> => fetchEntries('servicio', mapContentfulEntryToService);
export const fetchTestimonials = (): Promise<Testimonial[]> => fetchEntries('testimonio', mapContentfulEntryToTestimonial);
export const fetchMikUniverseServices = (): Promise<MikUniverseService[]> => fetchEntries('servicioUniversoMikai', mapContentfulEntryToMikUniverseService);

export const fetchMikaiLandingData = async (): Promise<MikaiLandingData | null> => {
  try {
    const items = await fetchEntries('landingMikaiMusic', mapContentfulEntryToMikaiLanding);
    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error('Error fetching mikai landing data:', error);
    return null;
  }
};

export const fetchMikaiRelease = async (): Promise<MikaiRelease | null> => {
    try {
        const releases = await fetchEntries('lanzamientoMikai', mapContentfulEntryToMikaiRelease);
        return releases.length > 0 ? releases[0] : null;
    } catch (error) {
        console.error('Error fetching mikai release:', error);
        return null;
    }
};

export const fetchLatestRelease = async (): Promise<Release | null> => {
    try {
        const releases = await fetchEntries('artistaPrincipal', mapContentfulEntryToRelease);
        return releases.length > 0 ? releases[0] : null;
    } catch (error) {
        console.error('Error fetching latest release:', error);
        return null;
    }
};

export const fetchAllData = async () => {
  try {
    const [
      albums,
      services,
      latestRelease,
      testimonials,
      mikUniverseServices,
      mikaiRelease,
      mikaiLandingData,
    ] = await Promise.all([
      fetchAlbums(),
      fetchServices(),
      fetchLatestRelease(),
      fetchTestimonials(),
      fetchMikUniverseServices(),
      fetchMikaiRelease(),
      fetchMikaiLandingData(),
    ]);

    const finalTestimonials = (testimonials && testimonials.length > 0) ? testimonials : MOCK_TESTIMONIALS;

    return {
      albums,
      services,
      latestRelease,
      testimonials: finalTestimonials,
      mikUniverseServices,
      mikaiRelease,
      mikaiLandingData,
    };
  } catch (error) {
    console.error("Failed to fetch all data from Contentful:", error);
    return {
      albums: [],
      services: [],
      latestRelease: null,
      testimonials: MOCK_TESTIMONIALS,
      mikUniverseServices: [],
      mikaiRelease: null,
      mikaiLandingData: null,
    };
  }
};
