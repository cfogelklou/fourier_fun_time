#./clean_and_unzip_pods.sh
#pod install

#Turn off this new xcode warning for double quoted includes.
pushd Pods/Pods.xcodeproj
for FILE in `find . -name "project.pbxproj"`
do
    cat "$FILE" | sed "s|CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;|CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = NO;|g" > tmpfile
    rm "$FILE"
    mv tmpfile "$FILE"    
done
popd