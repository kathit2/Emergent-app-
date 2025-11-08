import React from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProjectCard = ({ project, isExpanded, onToggle }) => {
  return (
    <div className={`bg-[#1a1a1a] rounded-xl border-l-4 overflow-hidden transition-all ${
      project.type === 'Analysis' ? 'border-[#FF6B35]' : 'border-[#00D9FF]'
    } hover:shadow-lg hover:shadow-${project.type === 'Analysis' ? '[#FF6B35]' : '[#00D9FF]'}/20`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white pr-4">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            project.type === 'Analysis' ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'bg-[#00D9FF]/20 text-[#00D9FF]'
          }`}>
            {project.type}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{project.summary}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map((tool, idx) => (
            <span key={idx} className="px-2 py-1 bg-[#0a0a0a] text-gray-300 text-xs rounded border border-gray-700">
              {tool}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-700 space-y-4 animate-in fade-in duration-300">
            <div>
              <h4 className="text-[#7FFF00] font-semibold mb-2">Key Insight:</h4>
              <p className="text-gray-300 text-sm">{project.keyInsight}</p>
            </div>
            
            {project.details && (
              <div>
                <h4 className="text-[#00D9FF] font-semibold mb-2">Details:</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {project.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.linkedinUrl && (
              <a 
                href={project.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#ff8555] transition-colors text-sm font-medium"
              >
                View Full Analysis <ExternalLink size={16} />
              </a>
            )}
          </div>
        )}
        
        <Button
          onClick={onToggle}
          variant="ghost"
          className="w-full mt-4 text-gray-400 hover:text-white hover:bg-[#0a0a0a]"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-2" size={16} />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2" size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;