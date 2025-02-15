import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
  },
  header: {
    backgroundColor: 'hsl(0 72.2% 50.6%)',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  divisionHeader: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
    fontSize: 14,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 5,
    marginBottom: 15,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'hsl(0 72.2% 50.6%)',
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    borderBottomStyle: 'solid',
  },
  cell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#b3b3b3',
    borderRightStyle: 'solid',
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  remarksContainer: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginTop: 10,
  },
  remarks: {
    padding: 2,
    marginTop: 5,
    fontSize: 10,
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
});
const RecheckingTable : React.FC<{report: Report}> = ({ report })=> {

  const data = transformPRrechecking(report)
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: -5 }}>E. Rechecking</Text>
        
        {
          data.divisions.map((item, index)=>(
            <View key={index} style={styles.container}>
              <Text style={styles.divisionHeader}>{item.name}</Text>
              
              <View style={styles.table}>
                  {/* Table Header */}
                    <View style={styles.headerRow}>
                      <Text style={styles.cell}>Class</Text>
                        {
                          item.classes[0].subjects.map((subs, index) => (
                            <Text key={index} style={styles.cell}>{subs.name}</Text>
                          ))
                          
                        }
                      <Text style={styles.cell}>Students</Text>
                      <Text style={[styles.cell, { borderRightWidth: 0 }]}>Percentage</Text>
                    </View>
              {
                item.classes.map((classItem, index)=> (
                  <View style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
                    <Text style={styles.cell}>{classItem.name}</Text>
                    {
                      classItem.subjects.map((classSub, index)=> (
                        
                        <Text style={styles.cell}>{classSub.count}</Text>
                      ))
                    }
                    <Text style={styles.cell}>{classItem.studentCount}</Text>
                    <Text style={[styles.cell, styles.lastCell]}>{classItem.percentage}</Text>

                    
                  </View>
                ))
                
              }
              <Text style={styles.remarks}>{report.PRrechecking.remarks}</Text>
              </View>
            </View>

          ))
        }

    </View>
  );
};

export default RecheckingTable;


type TransformedPRrechecking = {
  reportId: number;
  remarks: string;
  divisions: {
    id: number;
    name: string;
    classes: {
      id: number;
      name: string;
      studentCount: number;
      percentage: number;
      subjects: {
        id: number;
        name: string;
        count: number;
      }[];
    }[];
  }[];
};


function transformPRrechecking(report: Report): TransformedPRrechecking {
  console.log("TRANSFORMING");
  console.log(report);

  if (!report.PRrechecking) {
    console.error("PRrechecking is undefined in the report object");
    return {
      reportId: 0,
      remarks: "",
      divisions: [],
    };
  }

  const data = report.PRrechecking;
  console.log("2222");
  const transformed: TransformedPRrechecking = {
    reportId: data.reportId,
    remarks: data.remarks,
    divisions: [],
  };

  const divisionMap = new Map<number, {
    id: number;
    name: string;
    classes: Map<number, {
      id: number;
      name: string;
      studentCount: number;
      percentage: number;
      subjects: Map<number, {
        id: number;
        name: string;
        count: number;
      }>;
    }>;
  }>();

  for (const cell of data.PRrecheckingCell) {
    const divisionId = cell.class.grade.division.id;
    const divisionName = cell.class.grade.division.name;

    if (!divisionMap.has(divisionId)) {
      divisionMap.set(divisionId, {
        id: divisionId,
        name: divisionName,
        classes: new Map(),
      });
    }

    const division = divisionMap.get(divisionId)!;
    const classId = cell.class.id;
    const className = cell.class.name;

    if (!division.classes.has(classId)) {
      division.classes.set(classId, {
        id: classId,
        name: className,
        studentCount: cell.studentCount,
        percentage: cell.percentage,
        subjects: new Map(),
      });
    }

    const classData = division.classes.get(classId)!;

    for (const subjectCell of cell.PRrecheckingSubjectCell) {
      const subjectId = subjectCell.subject.id;
      const subjectName = subjectCell.subject.name;

      if (!classData.subjects.has(subjectId)) {
        classData.subjects.set(subjectId, {
          id: subjectId,
          name: subjectName,
          count: subjectCell.count,
        });
      }
    }
  }

  for (const division of divisionMap.values()) {
    const classes = [];

    for (const classData of division.classes.values()) {
      const subjects = Array.from(classData.subjects.values());
      classes.push({
        id: classData.id,
        name: classData.name,
        studentCount: classData.studentCount,
        percentage: classData.percentage,
        subjects,
      });
    }

    transformed.divisions.push({
      id: division.id,
      name: division.name,
      classes,
    });
  }

  console.log("Transformed Data:", transformed);
  return transformed;
}

// type  PRrechecking = {
//   reportId: number;
//   remarks: string;
//   PRrecheckingCell: {
//       id: number;
//       rowId: number;
//       classId: number;
//       count: number;
//       percentage: number;
//       studentCount: number;
//       PRrecheckingSubjectCell:{
//         id: number;
//         rowId: number;
//         subjectId: number;
//         count: number;
//         subject: {
//           id: number;
//           name: string;
//           gradeId: number;
//       }}
//       class: {
//           id: number;
//           name: string;
//           description: string;
//           campusId: number;
//           gradeId: number;
//           grade: {
//             id: number
//             name: string
//             division: {
//                 id: number,
//                 name: string
//             }
//           }
//       };
      
//   }[];

//   division: {
//     id:number;
//     name: string;   

//     classes: {
//       id: number;
//       name: string;
//       PRrechekingCell: {
//         count: number
//         percentage: number
//         PRrecheckingSubjectCell:{
//           id: number;
//           count: number;
//           subject: {
//             id: number;
//             name: string;
//         }
//       }
//     }
//   }