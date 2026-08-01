import { Button } from '@/components/ui/button';
import { AlertCircle, Phone, MapPin, Clock } from 'lucide-react';

export default function Emergency() {
  return (
    <section id="emergency" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alert Banner */}
        <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 md:p-12 mb-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Emergency Services</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Our 24/7 emergency department is fully equipped to handle all medical emergencies with rapid response times and expert care.
              </p>

              {/* Emergency Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/15 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">24/7 Hotline</h3>
                    <p className="text-sm text-muted-foreground">Available anytime for emergencies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/15 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">Average response time under 5 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/15 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Ambulance Service</h3>
                    <p className="text-sm text-muted-foreground">Well-equipped ambulances throughout the city</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-destructive hover:bg-destructive/90 gap-2">
                <Phone size={18} />
                Call Emergency: +1 (800) 123-4567
              </Button>
            </div>

            {/* Right Side - Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl p-6 border border-destructive/20">
                <h3 className="text-3xl font-bold text-destructive mb-2">300+</h3>
                <p className="text-sm text-muted-foreground">Emergency Cases Monthly</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-3xl font-bold text-primary mb-2">99%</h3>
                <p className="text-sm text-muted-foreground">On-Time Response Rate</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20">
                <h3 className="text-3xl font-bold text-secondary mb-2">50+</h3>
                <p className="text-sm text-muted-foreground">ER Doctors & Nurses</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                <h3 className="text-3xl font-bold text-accent mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground">Round-the-Clock Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Conditions */}
        <div className="bg-white rounded-xl border border-border p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">When to Seek Emergency Care</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Critical Conditions
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Chest pain or pressure
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Difficulty breathing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Loss of consciousness
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Severe allergic reactions
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Other Emergencies
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Severe accidents or trauma
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Severe burns or poisoning
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Sudden severe headache
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  Uncontrolled bleeding
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
