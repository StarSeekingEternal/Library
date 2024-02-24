import styles from "./page.module.css";
import LibrarySection from "@/components/LibrarySection/LibrarySection";

export const metadata = {
  title: 'Library',
}

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Library</h1>
      <LibrarySection></LibrarySection>
    </main>
  );
}
