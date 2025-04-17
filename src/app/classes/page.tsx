'use client';

import { useState, useEffect } from 'react';
import classesData, { ClassesData, getAllSemesters, getAllClasses } from './classes';

// ClassesData interface is now imported from classes.ts

import AuthCheck from "./AuthCheck";

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'person' | 'class'>('person');
  const [searchResults, setSearchResults] = useState<{[key: string]: unknown}>({});
  const [classes, setClasses] = useState<{[key: string]: string[]}>({});
  const [semester, setSemester] = useState<string>('all');
  
  // Extract all unique classes across all people and semesters
  useEffect(() => {
    setClasses(getAllClasses());
  }, []);
  
  // Get all available semesters
  const semesterList = ['all', ...getAllSemesters()];
  
  // Run search whenever search type or semester changes
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchType, semester]);
  
  // Helper function to normalize search terms for better matching
  const normalizeForSearch = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '');
  };
  
  // Format class number for display (add leading 0 to 4-digit classes)
  const formatClassNumber = (classNum: number): string => {
    const numStr = classNum.toString();
    if (numStr.length === 4) {
      return `0${numStr}`;
    }
    return numStr;
  };
  
  const handleSearch = () => {
    // Clear results if search term is empty
    if (!searchTerm) {
      setSearchResults({});
      return;
    }
    
    if (searchType === 'person') {
      // Search for a person
      const personResults: { [person: string]: { [semester: string]: number[] } } = {};
      const normalizedSearchTerm = normalizeForSearch(searchTerm);
      
      Object.entries(classesData as ClassesData).forEach(([person, semesters]) => {
        // Normalize the person name for more flexible matching
        const normalizedPerson = normalizeForSearch(person);
        if (normalizedPerson.includes(normalizedSearchTerm)) {
          if (semester === 'all') {
            // Include all semesters
            personResults[person] = semesters;
          } else {
            // Filter by selected semester
            if (semesters[semester]) {
              personResults[person] = { [semester]: semesters[semester] };
            }
          }
        }
      });
      
      setSearchResults(personResults);
    } else {
      // Search for a class
      const classResults: { [classNum: string]: string[] } = {};
      const normalizedSearchTerm = searchTerm.trim();

      Object.entries(classes).forEach(([classNum, people]) => {
        if (classNum.toString().includes(normalizedSearchTerm)) {
          if (semester === 'all') {
            // Return all people who've taken this class regardless of semester
            classResults[classNum] = people;
          } else {
            // Filter by semester
            const peopleInSemester = people.filter(person => {
              const personData = (classesData as ClassesData)[person];
              return personData[semester] && personData[semester].some(c => c.toString().startsWith(classNum));
            });
            
            if (peopleInSemester.length > 0) {
              classResults[classNum] = peopleInSemester;
            }
          }
        }
      });
      
      setSearchResults(classResults);
    }
  };
  
  return (
    <AuthCheck>
      <div className="container mx-auto py-10 px-4 min-h-screen bg-[#F1F5F9]">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#0D1433]">Phi Delt Class Search</h1>
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="mb-4">
              <label htmlFor="searchType" className="block text-sm font-medium text-[#0D1433] mb-1">
                Search Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#619CC7]"
                    name="searchType"
                    checked={searchType === 'person'}
                    onChange={() => setSearchType('person')}
                  />
                  <span className="ml-2 text-[#0D1433] font-medium">Person</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#619CC7]"
                    name="searchType"
                    checked={searchType === 'class'}
                    onChange={() => setSearchType('class')}
                  />
                  <span className="ml-2 text-[#0D1433] font-medium">Class</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="searchTerm" className="block text-sm font-medium text-[#0D1433] mb-1">
                {searchType === 'person' ? 'Person Name' : 'Class Number'}
              </label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // Use setTimeout to debounce the search for better performance
                  setTimeout(() => handleSearch(), 100);
                }}
                placeholder={searchType === 'person' ? 'Enter a brother\'s name' : 'Enter a class number'}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619CC7] text-[#0D1433]"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <label htmlFor="semester" className="block text-sm font-medium text-[#0D1433] mb-1">
                Semester
              </label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619CC7] text-[#0D1433]"
              >
                {semesterList.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem === 'all' ? 'All Semesters' : sem}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4 pt-4">
              <div className="text-sm text-[#619CC7] font-medium">
                {searchType === 'person' ? 'Search for brothers by name' : 'Search for classes by number'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          {Object.keys(searchResults).length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#0D1433]">
                {searchType === 'person' ? 'Classes Taken' : 'Brothers Who Have Taken This Class'}
              </h2>
              
              {searchType === 'person' ? (
                <div className="space-y-6">
                  {Object.entries(searchResults).map(([person, semesters]) => (
                    <div key={person} className="border p-4 rounded-lg bg-[#DBECF3]">
                      <h3 className="text-xl font-semibold mb-3 text-[#0D1433]">{person}</h3>
                      {Object.entries(semesters as {[sem: string]: number[]}).map(([sem, classes]) => {
                        // Sort classes in numerical order
                        const sortedClasses = [...classes].sort((a, b) => a - b);
                        
                        return (
                          <div key={sem} className="mb-3">
                            <div className="font-medium text-[#0D1433] mb-1">{sem}</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {sortedClasses.map((classNum) => (
                                <div key={classNum} className="bg-white p-2 rounded shadow-sm border border-gray-200 text-[#0D1433] font-medium">
                                  {formatClassNumber(classNum)}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(searchResults).map(([classNum, people]) => (
                    <div key={classNum} className="border p-4 rounded-lg bg-[#DBECF3]">
                      <h3 className="text-xl font-semibold mb-3 text-[#0D1433]">{formatClassNumber(Number(classNum))}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {(people as string[]).map((person) => (
                          <div key={person} className="bg-white p-2 rounded shadow-sm border border-gray-200 text-[#0D1433] font-medium">
                            {person}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-8 text-[#0D1433] font-medium">
              No results found. Try a different search term or filter.
            </div>
          ) : null}
        </div>
      </div>
    </div>
    </AuthCheck>
  );
}
