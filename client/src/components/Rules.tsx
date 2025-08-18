export default function Rules() {
  return (
    <section id="rules" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Club Rules</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Simple guidelines that keep our community strong and focused.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Membership</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">Regular</h4>
                <p className="text-gray-600">₩19,000 / month</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold">Dormant</h4>
                <p className="text-gray-600">₩5,000 / month (3-month blocks)</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-bold">Firefighter Cadet</h4>
                <p className="text-gray-600">Free</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Selection for Starters</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Skill level consideration</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Attendance tracking</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Coach's tactical needs</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Regular members priority</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Participation Benefits</h3>
            <p className="text-gray-700 mb-4">
              More attendance → better tactical roles, stronger team chemistry.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-sm mb-2">Monthly Operating Costs</h4>
              <p className="text-sm text-gray-600">≥ ₩50,000 in dues needed to operate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Tournament Policy</h3>
            <p className="text-gray-700 mb-4">
              NSF entry under official business-trip status with full travel coverage.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Day 1: Qualifiers</p>
              <p>• Day 2: Main Round</p>
              <p>• Day 3: Finals (if qualified)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Operations</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Venue fee</span>
                <span className="font-medium">≈ ₩100,000/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beverages</span>
                <span className="font-medium">≈ ₩10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guest revenue</span>
                <span className="font-medium">≈ ₩50,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Conduct & Safety</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Respect teammates</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Follow gym rules</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Wear indoor shoes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
