import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingSkills = () => {
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/trending-skills`
        );
        setTrendingSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending skills:", error);
        setLoading(false);
      }
    };

    fetchTrendingSkills();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Trending Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingSkills.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              {category._id}
            </h2>
            <p className="text-gray-600">
              Total Requests: <span className="font-bold">{category.totalRequests}</span>
            </p>
            <p className="text-gray-600">
              Total Offers: <span className="font-bold">{category.totalOffers}</span>
            </p>
            <p className="text-gray-600">
              Total Skills: <span className="font-bold">{category.totalSkills}</span>
            </p>
            <ul className="mt-4">
              {category.skills.slice(0, 3).map((skill) => (
                <li
                  key={skill._id}
                  className="text-sm text-gray-700 border-b border-gray-200 pb-2 mb-2"
                >
                  {skill.title} ({skill.type})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSkills;
