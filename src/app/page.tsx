import { Desktop } from "@/components/desktop/Desktop";
import { MobileHome } from "@/components/mobile/MobileHome";

export default function HomePage() {
  return (
    <>
      <div className="desktop-only">
        <Desktop />
      </div>
      <div className="mobile-only">
        <MobileHome />
      </div>
    </>
  );
}
