import PatientList from "@/components/PatientList";
import DiagnosisHistory from '@/components/DiagnosisHistory';
import DiagnosticList from "@/components/DiagnosticList";

export default function Home() {
  return (
    <main className="sm:grid sm:flex-wrap md:grid md:grid-rows-1 md:grid-flow-col md:gap-x-8 md:grid-cols-4 min-h-screen mx-4">
      <section className="mb-8 lg:mb-0" > <PatientList/> </section>
      <section className="col-start-2 col-end-4 grid gap-8">
        <DiagnosisHistory />
        <DiagnosticList />
      </section>
      <section>PatientProfile</section>
    </main>
  );
}
