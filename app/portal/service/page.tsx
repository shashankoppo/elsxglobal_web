import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ServiceManager from './service-manager';

export default function ServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <ServiceManager />
    </Suspense>
  );
}
