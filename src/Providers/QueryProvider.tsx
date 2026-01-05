import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";

const MIN = 60_000;
const APP_CACHE_BUSTER = "app-cache-v1";
const PERSIST_MAX_AGE = 10 * MIN;

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 1,
						gcTime: PERSIST_MAX_AGE,
					},
				},
			}),
	);

	const [persister] = useState(() =>
		createAsyncStoragePersister({ storage: window.localStorage }),
	);

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{
				persister,
				maxAge: PERSIST_MAX_AGE,
				buster: APP_CACHE_BUSTER,
			}}
		>
			{children}
		</PersistQueryClientProvider>
	);
}