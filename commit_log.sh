#!/bin/bash

echo "Github commits in 2021" > git_commit_logs.txt
printf "Jan : " >> git_commit_logs.txt
git rev-list --count --since="Jan 1 2021"  --before="Feb 1 2021" --all >> git_commit_logs.txt
printf "Feb : " >> git_commit_logs.txt
git rev-list --count --since="Feb 1 2021"  --before="Mar 1 2021" --all >> git_commit_logs.txt
printf "Mar : " >> git_commit_logs.txt
git rev-list --count --since="Mar 1 2021"  --before="Apr 1 2021" --all >> git_commit_logs.txt
printf "Apr : " >> git_commit_logs.txt
git rev-list --count --since="Apr 1 2021"  --before="May 1 2021" --all >> git_commit_logs.txt
printf "May : " >> git_commit_logs.txt
git rev-list --count --since="May 1 2021"  --before="Jun 1 2021" --all >> git_commit_logs.txt
printf "Jun : " >> git_commit_logs.txt
git rev-list --count --since="Jun 1 2021"  --before="Jul 1 2021" --all >> git_commit_logs.txt
printf "Jul : " >> git_commit_logs.txt
git rev-list --count --since="Jul 1 2021"  --before="Aug 1 2021" --all >> git_commit_logs.txt
printf "Aug : " >> git_commit_logs.txt
git rev-list --count --since="Aug 1 2021"  --before="Sep 1 2021" --all >> git_commit_logs.txt
printf "Sep : " >> git_commit_logs.txt
git rev-list --count --since="Sep 1 2021"  --before="Oct 1 2021" --all >> git_commit_logs.txt
printf "Oct : " >> git_commit_logs.txt
git rev-list --count --since="Oct 1 2021"  --before="Nov 1 2021" --all >> git_commit_logs.txt
printf "Nov : " >> git_commit_logs.txt
git rev-list --count --since="Nov 1 2021"  --before="Dec 1 2021" --all >> git_commit_logs.txt
printf "Dec : " >> git_commit_logs.txt
git rev-list --count --since="Dec 1 2021"  --before="Dec 31 2021" --all >> git_commit_logs.txt
printf "Total : " >> git_commit_logs.txt
git rev-list --count --since="Jan 1 2021"  --before="Jan 1 2022" --all >> git_commit_logs.txt