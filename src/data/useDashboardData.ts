import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardProvider } from "./providers";
import type { NewSalesRecord } from "./recordEntry";

export function useDashboardData() {
  const records = useQuery({ queryKey: ["dashboard", "records"], queryFn: () => dashboardProvider.getSalesRecords() });
  const markets = useQuery({ queryKey: ["dashboard", "markets"], queryFn: () => dashboardProvider.getMarkets(), staleTime: 5 * 60_000 });
  const services = useQuery({ queryKey: ["dashboard", "services"], queryFn: () => dashboardProvider.getServices(), staleTime: 5 * 60_000 });
  return { records, markets, services, isLoading: records.isLoading || markets.isLoading || services.isLoading, isError: records.isError || markets.isError || services.isError, refetchAll: () => Promise.all([records.refetch(), markets.refetch(), services.refetch()]) };
}
export function useCreateRecords() { const qc = useQueryClient(); return useMutation({ mutationFn: (records: NewSalesRecord[]) => dashboardProvider.createSalesRecords(records), onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }) }); }
export function useUpdateRecord() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, updates }: { id: string; updates: Partial<NewSalesRecord> }) => dashboardProvider.updateSalesRecord(id, updates), onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }) }); }
