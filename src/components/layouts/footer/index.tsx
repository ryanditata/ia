export default function Footer() {
  return (
    <footer className="bg-slate-900 py-6 text-white">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Dian Nuswantoro University. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
