import Header from "../components/Layout/Header";
import Section from "../components/Layout/Section";
import CampaignFilters from "../components/Campaign/CampaignFilters";
import CampaignTable from "../components/Campaign/CampaignTable";
import SummaryGrid from "../components/Global/SummaryGrid";
import PlaceholderChart from "../components/Charts/PlaceHolderChart";
import { useCampaignStore } from "../store/useCampaignStore";
import { useEffect } from "react";
import StreamingSection from "../components/streaming/StreamingSection";

export default function Dashboard() {
    const fetchCampaigns = useCampaignStore((s) => s.fetchCampaigns);
  const fetchGlobalInsights = useCampaignStore((s) => s.fetchGlobalInsights);

  useEffect(() => {
    fetchCampaigns();
    fetchGlobalInsights();
  }, []);
  return (
    <div>
      <Header />

      <div style={{padding: "20px"}}>
        
        <Section title="Global Insights">
          <SummaryGrid />
          <div style={{ marginTop: 20 }}>
            <PlaceholderChart height={220} />
          </div>
        </Section>

        <Section title="Campaign Performance">
          <CampaignFilters />
          <CampaignTable />
        </Section>

        <Section title="Real-time Streaming Insights">
          <StreamingSection />
        </Section>

      </div>
    </div>
  );
}