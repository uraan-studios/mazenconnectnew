"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useTTblContentModule from "@/stores/principalReport/ttblContent";
import { Switch } from "@/components/ui/switch"; // Import Switch from your local path

const ContentModule = () => {
  const store = useTTblContentModule();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>TTBL Content</CardTitle>
        <CardDescription>Submit if you received content from the TTBL</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Early Years Table */}
        <Table className="bg-secondary/15 p-6 rounded-md my-4 overflow-clip">
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="text-secondary-foreground">Class</TableHead>
              <TableHead className="text-secondary-foreground"></TableHead>
              <TableHead className="text-secondary-foreground">CLLE</TableHead>
              <TableHead className="text-secondary-foreground">CLLU</TableHead>
              <TableHead className="text-secondary-foreground">MD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Pre-Nursery</TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryCLLE}
                  onCheckedChange={(value) => store.setPreNurseryCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryCLLU}
                  onCheckedChange={(value) => store.setPreNurseryCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryMD}
                  onCheckedChange={(value) => store.setPreNurseryMD(value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Nursery</TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryCLLE}
                  onCheckedChange={(value) => store.setNurseryCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryCLLU}
                  onCheckedChange={(value) => store.setNurseryCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryMD}
                  onCheckedChange={(value) => store.setNurseryMD(value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Kindergarten</TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenCLLE}
                  onCheckedChange={(value) => store.setKindergartenCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenCLLU}
                  onCheckedChange={(value) => store.setKindergartenCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenMD}
                  onCheckedChange={(value) => store.setKindergartenMD(value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Grades 1–3 Table */}
        <Table className="bg-secondary/15 p-6 rounded-md my-4 overflow-clip">
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="text-secondary-foreground">Class</TableHead>
              <TableHead className="text-secondary-foreground"></TableHead>
              <TableHead className="text-secondary-foreground">English</TableHead>
              <TableHead className="text-secondary-foreground">Urdu</TableHead>
              <TableHead className="text-secondary-foreground">Math</TableHead>
              <TableHead className="text-secondary-foreground">G.K</TableHead>
              <TableHead className="text-secondary-foreground">ICT</TableHead>
              <TableHead className="text-secondary-foreground">Islamiyat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((grade) => (
              <TableRow key={`grade-${grade}`}>
                <TableCell colSpan={2}>Grade {grade}</TableCell>
                {["Eng", "Urdu", "Math", "GK", "ICT", "Isl"].map((subject) => (
                  <TableCell key={`${grade}-${subject}`}>
                    <Switch
                      checked={store.getGradeValue(grade, subject)}
                      onCheckedChange={(value) =>
                        store.setGradeValue(grade, subject, value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Grades 4–5 Table */}
        <Table className="bg-secondary/15 p-6 rounded-md my-4 overflow-clip">
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="text-secondary-foreground">Class</TableHead>
              <TableHead className="text-secondary-foreground"></TableHead>
              <TableHead className="text-secondary-foreground">English</TableHead>
              <TableHead className="text-secondary-foreground">Urdu</TableHead>
              <TableHead className="text-secondary-foreground">Math</TableHead>
              <TableHead className="text-secondary-foreground">Social Stds.</TableHead>
              <TableHead className="text-secondary-foreground">ICT</TableHead>
              <TableHead className="text-secondary-foreground">Islamiyat</TableHead>
              <TableHead className="text-secondary-foreground">Science</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[4, 5].map((grade) => (
              <TableRow key={`grade-${grade}`}>
                <TableCell colSpan={2}>Grade {grade}</TableCell>
                {["Eng", "Urdu", "Math", "SS", "ICT", "Isl", "Sci"].map((subject) => (
                  <TableCell key={`${grade}-${subject}`}>
                    <Switch
                      checked={store.getGradeValue(grade, subject)}
                      onCheckedChange={(value) =>
                        store.setGradeValue(grade, subject, value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContentModule;
