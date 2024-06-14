import PatientList from "@/components/PatientList";
import DiagnosisHistory from '../components/DiagnosisHistory';

export default function Home() {
  return (
    <main className="sm:flex sm:flex-wrap md:grid md:grid-rows-1 md:grid-flow-col md:gap-x-8 md:grid-cols-4 min-h-screen mx-4">
      <section> <PatientList/> </section>
      <section className="col-start-2 col-end-4">
        <DiagnosisHistory />
        
         - Diagnostic List
      </section>
      <section>PatientProfile</section>
    </main>
  );
}
