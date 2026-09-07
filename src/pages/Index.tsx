import { useState } from 'react';
import { Leaf, MapPin, TrendingUp, Calendar, FileText, Bell, User, ArrowRight, Clock, Smartphone, LogOut } from 'lucide-react';

// Mock Data
const mockFarmer = {
  id: 'FARMER_001',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  village: 'Nandyal',
  district: 'Kurnool',
  state: 'Andhra Pradesh',
};

const mockProcurementCenters = [
  { id: 1, name: 'Kurnool Mandi Center', distance: 2.3, address: 'Main Market', slots: 8, filled: 5 },
  { id: 2, name: 'Nandyal Agricultural Hub', distance: 0.5, address: 'Town Center', slots: 10, filled: 7 },
  { id: 3, name: 'Regional Center', distance: 15.2, address: 'Highway Road', slots: 15, filled: 12 },
];

const mockCrops = [
  { id: 1, name: 'Paddy (Rice)', price: 2400, unit: 'per quintal', status: 'accepted', demand: 'high' },
  { id: 2, name: 'Corn (Maize)', price: 1850, unit: 'per quintal', status: 'accepted', demand: 'medium' },
  { id: 3, name: 'Groundnut', price: 5200, unit: 'per quintal', status: 'accepted', demand: 'high' },
  { id: 4, name: 'Cotton', price: 6500, unit: 'per quintal', status: 'accepted', demand: 'low' },
];

const mockBookings = [
  { id: 'SLOT_001', crop: 'Paddy', quantity: 50, center: 'Nandyal Hub', date: '2026-09-15', time: '09:00 AM', status: 'confirmed', price: 2400 },
  { id: 'SLOT_002', crop: 'Groundnut', quantity: 30, center: 'Kurnool Center', date: '2026-09-08', time: '02:00 PM', status: 'completed', price: 5200 },
];

const availableSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '02:00 PM', available: true },
  { time: '03:30 PM', available: false },
  { time: '05:00 PM', available: true },
];

// Screen Components
const SplashScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex flex-col items-center justify-center p-4">
    <div className="text-center">
      <div className="mb-6 inline-block p-4 bg-white/20 rounded-full">
        <Leaf className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">KISAN SETHU</h1>
      <p className="text-lg text-white/90 mb-1">Smart Farmer Procurement</p>
      <p className="text-sm text-white/80 mb-12">Slot Booking System</p>
      <button
        onClick={onContinue}
        className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition flex items-center gap-2 mx-auto"
      >
        Get Started <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [phone, setPhone] = useState('');
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground mt-2">Login with your phone number</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Send OTP
          </button>
          <p className="text-center text-sm text-muted-foreground">Demo: Use any phone number</p>
        </div>
      </div>
    </div>
  );
};

const DashboardScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const upcomingBooking = mockBookings.find(b => b.status === 'confirmed');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            <h1 className="text-xl font-bold">KISAN SETHU</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('profile')} className="p-2 hover:bg-white/20 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-sm text-primary-foreground/90">Hello, {mockFarmer.name} 👋</p>
      </div>

      {/* Upcoming Booking */}
      {upcomingBooking && (
        <div className="p-4">
          <div className="bg-accent/10 border border-accent rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">Upcoming Booking</h3>
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">Confirmed</span>
            </div>
            <div className="space-y-1 text-sm">
              <p><strong>{upcomingBooking.crop}</strong> • {upcomingBooking.quantity} quintals</p>
              <p className="text-muted-foreground">{upcomingBooking.center}</p>
              <p className="text-muted-foreground">📅 {upcomingBooking.date} at {upcomingBooking.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Bookings</p>
          <p className="text-lg font-bold text-foreground">{mockBookings.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-lg font-bold text-foreground">{mockBookings.filter(b => b.status === 'completed').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Centers</p>
          <p className="text-lg font-bold text-foreground">{mockProcurementCenters.length}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <button
          onClick={() => onNavigate('crops')}
          className="bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition flex flex-col items-center gap-2"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-sm">Check Prices</span>
        </button>
        <button
          onClick={() => onNavigate('centers')}
          className="bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition flex flex-col items-center gap-2"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-sm">Find Centers</span>
        </button>
        <button
          onClick={() => onNavigate('booking')}
          className="bg-accent text-accent-foreground py-4 rounded-lg font-semibold hover:bg-accent/90 transition flex flex-col items-center gap-2"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-sm">Book Slot</span>
        </button>
        <button
          onClick={() => onNavigate('bookings')}
          className="bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold hover:bg-secondary/90 transition flex flex-col items-center gap-2"
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm">My Bookings</span>
        </button>
      </div>

      {/* Featured Crops */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-foreground mb-3">Today's Top Prices</h2>
        <div className="space-y-2">
          {mockCrops.slice(0, 3).map(crop => (
            <div key={crop.id} className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground text-sm">{crop.name}</p>
                <p className="text-xs text-muted-foreground">₹{crop.price} {crop.unit}</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{crop.demand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CropsScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => (
  <div className="min-h-screen bg-background pb-24">
    <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
      <button onClick={() => onNavigate('dashboard')} className="hover:bg-white/20 p-2 rounded">←</button>
      <h1 className="text-xl font-bold">Current Crop Prices</h1>
    </div>
    <div className="p-4 space-y-3">
      {mockCrops.map(crop => (
        <div key={crop.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-foreground">{crop.name}</h3>
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Accepted</span>
          </div>
          <p className="text-2xl font-bold text-primary mb-2">₹{crop.price}</p>
          <p className="text-sm text-muted-foreground">{crop.unit}</p>
          <p className="text-xs text-muted-foreground mt-2">Demand: <strong>{crop.demand}</strong></p>
        </div>
      ))}
    </div>
  </div>
);

const CentersScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => (
  <div className="min-h-screen bg-background pb-24">
    <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
      <button onClick={() => onNavigate('dashboard')} className="hover:bg-white/20 p-2 rounded">←</button>
      <h1 className="text-xl font-bold">Nearby Centers</h1>
    </div>
    <div className="p-4 space-y-3">
      {mockProcurementCenters.map(center => (
        <div key={center.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-foreground">{center.name}</h3>
            <span className="text-sm text-primary font-semibold">{center.distance} km</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{center.address}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="text-muted-foreground">Slots: <strong className="text-foreground">{center.slots - center.filled}/{center.slots}</strong></p>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90"
            >
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookingScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const [selectedCenter, setSelectedCenter] = useState(mockProcurementCenters[1]);
  const [selectedCrop, setSelectedCrop] = useState(mockCrops[0]);
  const [quantity, setQuantity] = useState('50');
  const [date, setDate] = useState('2026-09-15');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [step, setStep] = useState(1);

  const handleBook = () => {
    if (selectedCenter && selectedCrop && quantity && date && selectedSlot) {
      onNavigate('confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <button onClick={() => onNavigate('dashboard')} className="hover:bg-white/20 p-2 rounded">←</button>
        <h1 className="text-xl font-bold">Book Slot</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between px-4 py-4 text-sm">
        {[1, 2, 3].map(s => (
          <div key={s} className={`text-center ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${step >= s ? 'bg-primary text-white' : 'bg-border'}`}>{s}</div>
            <p className="text-xs">{s === 1 ? 'Crop' : s === 2 ? 'Center' : 'Slot'}</p>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {step === 1 && (
          <>
            <h2 className="font-semibold text-foreground">Select Crop</h2>
            <div className="space-y-2">
              {mockCrops.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition ${
                    selectedCrop.id === crop.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <p className="font-semibold text-foreground">{crop.name}</p>
                  <p className="text-sm text-muted-foreground">₹{crop.price}/{crop.unit}</p>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity (quintals)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-semibold text-foreground">Select Center & Date</h2>
            <div className="space-y-2">
              {mockProcurementCenters.map(center => (
                <button
                  key={center.id}
                  onClick={() => setSelectedCenter(center)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition ${
                    selectedCenter.id === center.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <p className="font-semibold text-foreground">{center.name}</p>
                  <p className="text-sm text-muted-foreground">{center.distance} km • {center.slots - center.filled} slots</p>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90">Continue</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-semibold text-foreground">Select Time Slot</h2>
            <div className="space-y-2">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                  className={`w-full p-3 rounded-lg border-2 text-center font-semibold transition ${
                    selectedSlot === slot.time
                      ? 'border-primary bg-primary/5 text-primary'
                      : slot.available
                      ? 'border-border text-foreground hover:border-primary/50'
                      : 'border-border text-muted-foreground opacity-50'
                  }`}
                >
                  {slot.time} {!slot.available && '(Full)'}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Crop:</span> <span className="font-semibold">{selectedCrop.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Quantity:</span> <span className="font-semibold">{quantity} quintals</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Price/unit:</span> <span className="font-semibold">₹{selectedCrop.price}</span></div>
                <div className="border-t border-primary/20 pt-2 mt-2 flex justify-between font-bold text-primary">
                  <span>Expected Amount:</span>
                  <span>₹{(parseInt(quantity) * selectedCrop.price).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold">Back</button>
              <button onClick={handleBook} disabled={!selectedSlot} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50">Confirm</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ConfirmationScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const slotId = `SLOT_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Booking Confirmed</h1>
      </div>

      <div className="p-4 space-y-4 mt-4">
        {/* Success Badge */}
        <div className="text-center py-6 bg-green-50 rounded-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl text-white">✓</span>
          </div>
          <h2 className="text-xl font-bold text-green-700">Booking Successful!</h2>
          <p className="text-sm text-green-600 mt-1">Your slot has been reserved</p>
        </div>

        {/* Details */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Slot ID</p>
            <p className="font-mono text-lg font-bold text-foreground">{slotId}</p>
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Farmer:</span> <span className="font-semibold">{mockFarmer.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Crop:</span> <span className="font-semibold">Paddy (Rice)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Quantity:</span> <span className="font-semibold">50 quintals</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Center:</span> <span className="font-semibold">Nandyal Hub</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date:</span> <span className="font-semibold">2026-09-15</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time:</span> <span className="font-semibold">09:00 AM</span></div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-primary">
              <span>Expected Amount:</span>
              <span>₹120,000</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase font-semibold mb-3">Status</p>
          <div className="space-y-3">
            {['Slot Booked', 'Arrived', 'Crop Testing', 'Sale Completed', 'Receipt Issued'].map((status, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-primary text-white' : 'bg-border text-muted-foreground'}`}>
                  {idx === 0 ? '✓' : idx + 1}
                </div>
                <span className={idx === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button onClick={() => onNavigate('bookings')} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90">View My Bookings</button>
          <button onClick={() => onNavigate('dashboard')} className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/90">Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

const BookingsScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => (
  <div className="min-h-screen bg-background pb-24">
    <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
      <button onClick={() => onNavigate('dashboard')} className="hover:bg-white/20 p-2 rounded">←</button>
      <h1 className="text-xl font-bold">My Bookings</h1>
    </div>
    <div className="p-4 space-y-3">
      {mockBookings.map(booking => (
        <div key={booking.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-foreground">{booking.crop}</h3>
            <span className={`text-xs px-2 py-1 rounded ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {booking.status}
            </span>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground mb-3">
            <p>{booking.quantity} quintals • {booking.center}</p>
            <p>📅 {booking.date} at {booking.time}</p>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-sm font-semibold text-primary">₹{(booking.quantity * booking.price).toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">{booking.id}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProfileScreen = ({ onNavigate, onLogout }: { onNavigate: (screen: string) => void; onLogout: () => void }) => (
  <div className="min-h-screen bg-background pb-24">
    <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
      <button onClick={() => onNavigate('dashboard')} className="hover:bg-white/20 p-2 rounded">←</button>
      <h1 className="text-xl font-bold">Profile</h1>
    </div>
    <div className="p-4 space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground uppercase mb-3">Farmer Information</p>
        <div className="space-y-3 text-sm">
          <div><span className="text-muted-foreground">Name:</span> <span className="font-semibold text-foreground block">{mockFarmer.name}</span></div>
          <div><span className="text-muted-foreground">Phone:</span> <span className="font-semibold text-foreground block">{mockFarmer.phone}</span></div>
          <div><span className="text-muted-foreground">Village:</span> <span className="font-semibold text-foreground block">{mockFarmer.village}</span></div>
          <div><span className="text-muted-foreground">District:</span> <span className="font-semibold text-foreground block">{mockFarmer.district}</span></div>
          <div><span className="text-muted-foreground">State:</span> <span className="font-semibold text-foreground block">{mockFarmer.state}</span></div>
        </div>
      </div>
      <button onClick={onLogout} className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-semibold hover:bg-destructive/90 flex items-center justify-center gap-2">
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </div>
  </div>
);

// Main App Component
const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="bg-background min-h-screen">
      {currentScreen === 'splash' && <SplashScreen onContinue={() => handleNavigate('login')} />}
      {currentScreen === 'login' && <LoginScreen onLogin={() => handleNavigate('dashboard')} />}
      {currentScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
      {currentScreen === 'crops' && <CropsScreen onNavigate={handleNavigate} />}
      {currentScreen === 'centers' && <CentersScreen onNavigate={handleNavigate} />}
      {currentScreen === 'booking' && <BookingScreen onNavigate={handleNavigate} />}
      {currentScreen === 'confirmation' && <ConfirmationScreen onNavigate={handleNavigate} />}
      {currentScreen === 'bookings' && <BookingsScreen onNavigate={handleNavigate} />}
      {currentScreen === 'profile' && <ProfileScreen onNavigate={handleNavigate} onLogout={handleLogout} />}
    </div>
  );
};

export default Index;
