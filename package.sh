version=$(node getVersion.js)

cd build && zip -r pending-${version}.mds.zip . && mv pending-${version}.mds.zip ../