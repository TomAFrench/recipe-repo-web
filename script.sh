cat .env.production | grep = | sort | sed -e 's|REACT_APP_\([a-zA-Z_]*\)=\(.*\)|REACT_APP_\1=NGINX_REPLACE_\1|' > .env.production

NGINX_SUB_FILTER=$(cat .env.production | grep '=' | sort | sed -e 's/REACT_APP_\([a-zA-Z_]*\)=\(.*\)/sub_filter\ \"NGINX_REPLACE_\1\" \"$\{\1\}\";/')

cat nginx.conf.sample | sed -e "s|LOCATION_SUB_FILTER|$(echo $NGINX_SUB_FILTER)|" | sed 's|}";\ |}";\n\t\t|g' > nginx.conf

envsubst < nginx.conf > default.conf