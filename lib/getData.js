import { cache } from 'react';

import { getAllData } from '@/services/prismic';
import { createClient } from '@/prismicio';

// Shared by generateMetadata and Page so one request fetches Prismic once.
export const getData = cache(() => getAllData(createClient()));
