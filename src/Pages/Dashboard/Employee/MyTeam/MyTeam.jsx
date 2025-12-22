import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEnvelope, FaBriefcase, FaBirthdayCake } from "react-icons/fa";
import Loading from "../../../../Components/Loading/Loading";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [activeCompany, setActiveCompany] = useState("");

  /* Get company list */
  const { data: companies = [], isLoading: companyLoading } = useQuery({
    queryKey: ["my-team-companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-team/companies");
      return res.data;
    },
  });

  /* byDefault company */
  useEffect(() => {
    if (companies.length > 0 && !activeCompany) {
      setActiveCompany(companies[0].companyName);
    }
  }, [companies, activeCompany]);

  /* Get team data */
  const { data: teamData = {}, isLoading: teamLoading } = useQuery({
    queryKey: ["my-team", activeCompany],
    enabled: !!activeCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-team?company=${activeCompany}`);
      return res.data;
    },
  });

  console.log(teamData);

  if (companyLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <title>AssetVerse | My-Team</title>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Team</h2>
        <p className="text-sm text-gray-500">
          View colleagues in your company (read-only)
        </p>
      </div>

      {/* Dropdown */}
      <div className="mb-8 w-full max-w-sm">
        <label className="block mb-1 text-sm font-medium text-gray-600">
          Select Company
        </label>

        <select
          value={activeCompany}
          onChange={(e) => setActiveCompany(e.target.value)}
          className="input w-full outline-none focus:border-2 focus:border-primary"
        >
          {/* Options */}
          {companies.map((company, index) => (
            <option key={index} value={company.companyName}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      {teamLoading && <Loading />}

      {/* Team Members */}
      {teamData.team && (
        <>
          <h3 className="text-xl font-semibold mb-5 text-gray-800">
            Team Members
          </h3>

          {teamData.team.length === 0 ? (
            <p className="text-gray-500">No team members found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
              {teamData.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-xl hover:shadow-md transition"
                >
                  {/* photo */}
                  <div className="flex justify-center">
                    <img
                      src={
                        member.photo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdZViE66j-NjGxox1Yz2JCNB7cP_byawE3w&s"
                      }
                      alt="employee"
                      className="w-20 h-20 rounded-full object-cover border border-primary"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center mt-4">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {member.name}
                    </h4>

                    <p className="flex justify-center items-center gap-1 text-sm text-gray-500 mt-1">
                      <FaEnvelope size={16} className="mt-0.5" />
                      {member.email}
                    </p>

                    <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                      <FaBriefcase size={10} />
                      {member.position}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/*  Upcoming Birthdays */}
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaBirthdayCake className="text-pink-500" />
            Upcoming Birthdays
          </h3>

          {teamData.upcomingBirthdays.length === 0 ? (
            <p className="text-gray-500">No birthdays this month 🎉</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {teamData.upcomingBirthdays.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50">
                    🎂
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{person.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(person.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTeam;
